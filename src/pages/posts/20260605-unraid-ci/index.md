---
title: "Unraid CI"
date: 2026-06-05T16:09:05-04:00
tags: unraid, devops, gitops, claude, ai
summary: Turning Unraid into a DIY Git Ops CI System
twitterprompt: Turning Unraid into a DIY Git Ops CI System
draft: true
---

TODO CHECK WE vs YOU and tenses

This post describes how you can DIY your own gitops on Unraid (or any old Linux hardware you've got
hanging around), complete with custom git lifecycle hooks, secure VMs for running jobs, and job
status notifications. In the process, we'll build a progressively more useful gitops system.

*AI Disclosure*: all words in this blog post were written by me without help from AI in any way,
shape, or form. The original version of my DIY gitops described herein was developed with support
from Claude Opus 4.7. The code snippets I showcase below were either written manually by me or they
are simplified versions of AI generated code. Where AI was used most heavily will be noted in the
post itself.

---

GitHub has been having problems lately. It's annoying. Outside of work, I usually have a handful of
side projects going at any time. All of them need version control, some of them need CI too. GitHub
used to be my default git remote. With the recent stability problems and the seemingly constant
stream of news about GitHub hacks, I decided now is a good time to rip off the Band-aid and
self-host a git remote. TODO add links

TODO more complete intro of final product with tl;dr

Self-hosting Forgejo, Gitea, Codeberg, or any number of open source web-based git remotes makes
perfect sense. It's fun, empowering, and a great learning experience to control your own
infrastructure. I was about to spin up a Forgejo instance, when I had a thought.

*Do I really need a whole ass web stack on the public internet for my lousy personal projects?*

Not all of my code needs to be public. I like writing little utilities for home automation. I like
writing little chatbots for my Matrix server. I build my projects into images and run them on
Unraid. I like asking LLMs to write garbage code to help me solve problems that I, and only I, care
about. Despite the fact that this isn't production code, I still want to automatically run tests and
build images and executables.

What I needed was not a full-stack web application with backend workers. I just needed a place to
store code and spin up ephemeral job runners in isolated environments on occasion.

I'm already running an Unraid instance. I decided to roll my own gitops on it. My three goals were:

1. A git remote that's easy to manage
2. A CI runner that is as simple as possible
3. Maximize security without going crazy

I've been using the setup for the last few weeks and I've been pretty happy. I wanted to share it.

This isn't a step-by-step tutorial as much as it broadly describes how you can set up a barebones
git remote with the capability to be a CI runner on any old Linux machine sitting around your house.
While some parts of the guide below describe Unraid-specific features, this crux of the strategy
here is just fun with `git`, bash scripts, and virtio.

#### Quick Definitions

There's a variety of words to describe a system that does work when code is pushed. Here are the words I use:

- **CI**: Continuous Integration. Doing work when new code shows up to keep some system up-to-date
  automatically
- **Job**: some work that is done using code in a repo. A job could entail any combination of tests,
  compiling, building container images, uploading container images, etc. A job is a part of CI
- **Runner**: a machine or VM that runs a job

### Step 1. Setting up a Git Remote

This is the easiest part. You can turn any machine with `git` installed on a network into a git
remote. Just make sure you have SSH access first. I recommend copying your SSH key to the machine.
See github docs. TODO

Assume the repo is called `my-project`. On the remote:

1. Create an empty directory for your project. On Unraid, I created a new share, `/mnt/user/git`, for my repos first. The share is backed up on my array, so there is some redundancy across disks. Offsite backups have to be set up manually, but that's something you can configure later.
   ```sh
   mkdir -p /mnt/user/git/my-project.git
   ```
2. Turn the directory into a bare git repo.
   ```sh
   cd /mnt/user/git/my-project.git
   git init --bare
   ```

That's all there is to setting up the remote itself.

For this guide, I'll use `unraid.local` as the DNS of the remote on my LAN. Also, Unraid
(annoyingly) only has a `root` user, which is why I use `root` below. Replace `root` with the
username of the user on the remote you SSH in as.

From the repo on your dev machine:

1. Initialize the repo and set the remote to your dev machine. You'll need to configure it to use git over SSH.
   ```sh
   git init
   git remote add origin root@unraid.local:/mnt/user/git/my-project.git
   ```
2. Add, commit, and push like normal.
   ```sh
   git add . && git commit -m "init" # or whatever you want to do to commit files
   git push -u origin main
   ```

At this point, you're all set with your remote.

If you don't expose the remote to the public internet directly, you don't have much to worry about
for security. If you want to access it outside your network, I recommend using something like
Tailscale (you will need to setup a separate remote with your remote machine's address on
Tailscale).

### Step 2. Doing Work When Code Is Pushed

`git` comes with [lifecycle hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) for
local and remote repos. The key hook we need to create on the remote is `post-receive`. The
aforementioned docs even call out the `post-receive` hook as being the one to use to notify CI
servers. On remote, lifecycle hooks live in the `hooks/` directory. On a new bare repo, you'll find
samples for most hooks available to you. Here's what I see.

```sh
ls -al /mnt/user/git/my-project.git/hooks
```

prints

```txt
total 64
-rwxrwxrwx 1 root root  478 Jun  7 13:24 applypatch-msg.sample*
-rwxrwxrwx 1 root root 1972 Jun  7 13:24 commit-msg.sample*
-rwxrwxrwx 1 root root 4611 Jun  7 13:24 fsmonitor-watchman.sample*
-rwxrwxrwx 1 root root  189 Jun  7 13:24 post-update.sample*
-rwxrwxrwx 1 root root  424 Jun  7 13:24 pre-applypatch.sample*
-rwxrwxrwx 1 root root 1649 Jun  7 13:24 pre-commit.sample*
-rwxrwxrwx 1 root root  416 Jun  7 13:24 pre-merge-commit.sample*
-rwxrwxrwx 1 root root 1374 Jun  7 13:24 pre-push.sample*
-rwxrwxrwx 1 root root 4898 Jun  7 13:24 pre-rebase.sample*
-rwxrwxrwx 1 root root  544 Jun  7 13:24 pre-receive.sample*
-rwxrwxrwx 1 root root 1492 Jun  7 13:24 prepare-commit-msg.sample*
-rwxrwxrwx 1 root root 2783 Jun  7 13:24 push-to-checkout.sample*
-rwxrwxrwx 1 root root 2308 Jun  7 13:24 sendemail-validate.sample*
-rwxrwxrwx 1 root root 3650 Jun  7 13:24 update.sample*
```

A couple things to note here. First off, every hook is executable. These scripts will be called
directly by `git`. The second thing to note is the sheer breadth of connections to the `git`
lifecycle where you can inject custom code. There are lots of possibilities for customizing the
behavior of your remote! The last thing to note is that there is no sample for `post-receive`. No
worries, though. We can still create a hook.

As a proof of concept, create a file called `/mnt/user/git/my-project.git/hooks/post-receive` with
the following content.

```sh
#!/usr/bin/env bash

# hooks/post-receive

set -eou pipefail

echo "I'm a message from the post-receive hook!"
```

Make sure it's executable.

```sh
chmod +x /mnt/user/git/my-project.git/hooks/post-receive
```

The next time you `git push` to the remote, you'll see the message from the `post-receive` hook in
the response.

```txt
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Writing objects: 100% (3/3), 270 bytes | 270.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: I'm a message from the post-receive hook!
To unraid.local:/mnt/user/git/my-project.git
   4b759db..24a20d2  main -> main
```

Note that `post-receive` runs *after* changes have already been accepted. The exit code of the hook
has no effect on the repo. If you wanted to, say, reject commits when tests fail, you'd need to use
the `pre-receive` or `update` hooks. Unlike `post-receive`, a failing exit code from the
`pre-receive` or `update` hook would cause the remote to reject changes.

`hooks/post-receive` receives arguments from the `git` client over stdin. According to the docs
linked above, we should get the old revision, new revision, and the branch name. Let's `echo` what
we see.

```sh
#!/usr/local/env bash

# hooks/post-receive

set -eou pipefail

while IFS= read -r line; do
    echo "From stdin: $line"
done
```

Running `git push` shows

```txt
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 16 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 305 bytes | 305.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: From stdin: d772ae525d07afc8915ea81f897cb38ddba9b23f cee29c2e905d1f3a4cf9af3e9b5bb7b5a0934c25 refs/heads/main
To unraid.local:/mnt/user/git/my-project.git
   d772ae5..cee29c2  main -> main
```

We've got the full hashes and branch to work with. There isn't anything special about this
environment either. We can run any arbitrary command available on the remote machine.

If we wanted to act on the code in the repo, say to run tests, we would need to take one more step.
The bare repo consists of refs and commits, not normal files. There are a few ways to instantiate
the repo. The simplest I've found is to use a temp directory.

```sh
#!/usr/bin/env bash

# hooks/post-receive

set -eou pipefail

GIT_DIR=$(pwd)

# we want check out the commit into a temp worktree
WORK_DIR=$(mktemp -d)
SRC="$WORK_DIR/src"

while read -r oldrev newrev refname; do
    # check out the worktree at the last commit that was pushed
    git --git-dir="$GIT_DIR" worktree add --quiet --detach "$SRC" "$newrev"
    # update submodules
    [[ -f "$SRC/.gitmodules" ]] && git -C "$SRC" submodule update --init --recursive --quiet
done

pushd $SRC > /dev/null

# run a job here!
# as a proof of concept that we have access to the worktree, just read the README
head README.md

popd > /dev/null

rm -rf "$WORK_DIR"
```

When you commit and push, you should see output like this:

```txt
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 363 bytes | 181.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
remote: # My Project
remote:
remote: This is a temporary repo. If you can see this, you can read the README.
To unraid.local:/mnt/user/git/my-project.git
   fe87152..9aa2c06  main -> main
```

Replace `head README.md` in `post-receive` with whatever test invocation or script you want to use
to start the job.

### Step 3. Defining Jobs

It doesn't make sense to divorce the logic of defining jobs from the repo itself. Instead, let's
make a convention for authoring jobs in a repo.

1. Jobs are defined as bash scripts
2. Jobs scripts live in a`.ci/` directory in the repo
3. Job scripts are named by branch explicitly, e.g., `.ci/main.sh` runs when `main` is pushed,
   `.ci/dev.sh` runs when `dev` is pushed, etc.
4. Job scripts are run from the root of the repo

I like this convention because it's simple. It doesn't need to be robust because this is meant to be
a simple system for my personal repos. There is no notion of a fallback job to run for all
branches, regardless of name. There is no regex branch matching either. Defining `.ci/main.sh` is
all I need 99% of the time. But it's pretty easy to expand upon if I ever feel like it down the road.

Let's update `post-receive` to match the branch name to a job script and run it from the root of the
repo.

```sh
#!/usr/bin/env bash

# hooks/post-receive

set -eou pipefail

GIT_DIR=$(pwd)

# we want check out the commit into a temp worktree
WORK_DIR=$(mktemp -d)
SRC="$WORK_DIR/src"

clean_up() {
    git --git-dir="$GIT_DIR" worktree remove --force "$SRC"
    rm -rf "$WORK_DIR"
}

while read -r oldrev newrev refname; do
    # check out the worktree at the last commit that was pushed
    git --git-dir="$GIT_DIR" worktree add --quiet --detach "$SRC" "$newrev"
    
    # update submodules if necessary
    [[ -f "$SRC/.gitmodules" ]] && git -C "$SRC" submodule update --init --recursive --quiet

    # parse the branch name
    BRANCH=${refname#refs/heads/}
    SCRIPT="$SRC/.ci/$BRANCH.sh"
done

if [[ ! -f "$SCRIPT" ]]; then
    # exit early if there is no job to run
    clean_up
    exit 0
fi

pushd $SRC > /dev/null

bash $SCRIPT

popd > /dev/null

clean_up
```

I'll admit that I was not familiar with bash's prefix-removal operator, `${variable#pattern}`, when
I started this project. This is one of the places where AI helped. I encountered it in the first
versions of the runner that Claude helped write. What is happening is that the first instance of
`pattern` is being stripped from `variable`. As we saw earlier, `refname` has the form of
`refs/heads/BRANCH`. Stripping the `refs/heads/` out leaves us with just the branch name.

Once we have the branch, it's a simple matter of checking whether an eponymous script lives in
`.ci/`. If a job script doesn't exist, we bail early. Otherwise, we run it with bash from the root
of the repo.

### Step 4. Run Jobs Asynchronously

At this point, we've got a fully functional job runner. There is the problem that the entire
`post-receive` hook runs synchronously while your local `git` client is waiting for the response
from `git push`. This lag in the response time will get annoying very quickly if the job takes more
than a split second.

Let's make the job runner asynchronous. We'll do so with `setsid`. `setsid` creates a new session
that's completely detached from the current one. The flow we want is for `post-receive` to fork a
new session with `setsid -f`, in which we will run the job. Meanwhile, `post-receive` can respond to
your local `git` and exit unimpeded.

To simplify the setup, we now need two scripts on the git remote - `post-receive` and `run-job.sh`.
We'll put `run-job.sh` on the `$PATH` to simplify things.

```sh
#!/usr/bin/env bash

# hooks/post-receive

...
```

```sh
#!/usr/bin/env bash

# run-job.sh

...
```

### Step 5. A Secure Job Runner

I've been using the terms CI, jobs, and runner pretty loosely. What we will build is not necessarily
a CI server out of the box, but it has all the pieces needed to create your own CI pipelines. What
we will build instead is a flexible *job* runner.

