---
title: "Backing up Jira and Confluence Servers"
date: 2018-09-29T21:44:44-05:00
tags: 
  - atlassian
  - jira
  - confluence
  - crontab
  - aws
  - s3
twitterprompt: Cameron is afraid of losing his TODO list
summary: "How to back up Jira and Confluence server instances to the cloud. Bonus: my thoughts on the importance of being a lazy software engineer."
draft: false
---

*Skip down to [Actual Strategy](#actual-strategy) if you just want the technical info about setting up `crontab` scripts. I'm going to talk about Jira and work philosophy first.*

I run my own personal [Jira](https://www.atlassian.com/software/jira) and [Confluence](https://www.atlassian.com/software/confluence) instances on home server. I got reliant on Jira at Udacity. I actually think it's fantastic. With lots of projects always going on at work and at home, it helps me wade through the chaos to find out what exactly I should be working on.

The Jira + Confluence combo is kind of overkill for a personal setup given the focus on enterprise and the insane level of customization available. But I enjoy the level of control it affords. And price-wise it works out great. With the server editions, it's \$10 for lifetime access to Jira software and an additional \$10 for access to Confluence. This isn't bad given that most hosted options will charge at least a few dollars a month for similar capabilities. Of course, it also helps that I already have a capable server running 24/7, which makes server hardware a sunk cost in this equation.

However, the one thing missing is cloud storage and backup. I back Jira and Confluence with a database running on the same machine (just a PostgreSQL container). If something were to happen to my server, all would be lost. When I first spun up my Jira and Confluence instances, I was aware of this fact and accepted it. I'm making an effort to make more intelligent ([lazy](http://wiki.c2.com/?OptimizeLater)) decisions as a software engineer. In my earlier days, I loved [premature optimizations](http://wiki.c2.com/?PrematureOptimization). I would jump at any opportunity to design and build what I would have considered a robust and thorough system as early in a project as possible. I wasted time building and planning for features I imagined I *might* need two or three iterations later. I recently poked through code I wrote a few years ago and I saw evidence of this everywhere. Modules and classes that exist because "I may want this later." Logic split between packages in half-assed attempts to make code DRYer and more modular. Logging systems that never needed to exist and that actually make it harder to find errors.

Nowadays, I do as little as possible. I was fine leaving my Jira and Confluence data in a precarious situation because it would take effort to back them up and I didn't know if that effort was worth it at the outset. I easily could have abandoned Jira, in which case, why bother backing it up?

I decided that backing up the data was worth the effort this week. I found myself reaching for a Confluence page to jot down notes I most definitely did not want to risk losing. And I have almost 100 Jira issues across four projects actively tracked (and all assigned to me!). Now that I not only have important information there but I'm becoming reliant on it, I need to make sure my life won't spiral out of control if, say, my adorable husky found a way to knock my server off the bureau in my office. Here's what I came up with.

<h3 id="actual-strategy">Actual Strategy</h3>

If you follow the same path as me, you'll get a quick intro to the `awscli` tool and `crontab`, both of which are super useful.

* Repo [here](https://github.com/cameronwp/atlassian-sync).
* Official [Jira](https://confluence.atlassian.com/adminjiraserver071/backing-up-data-802592964.html) and [Confluence](https://confluence.atlassian.com/doc/production-backup-strategy-38797389.html) backup advice.

I want to back up everything that I would need to restart Jira or Confluence from scratch. This includes the database as well as data / attachment folders. I'm using AWS S3 as my storage mechanism.

Once a day, a cronjob runs on my server. See the [repo](https://github.com/cameronwp/atlassian-sync) for the full scripts and installation instructions. The gist of it is:

```sh
#!/bin/bash

# sync_jira.sh

DB_DUMP=$(date +db_%Y%m%d.gz)
DATA_DIR_ZIP=$(date +data_%Y%m%d.tar.gz)

# Pipe the database dump straight into gzip and awscli
pg_dump -h localhost -U jira jira | gzip | ~/.local/bin/aws s3 cp - s3://[BUCKET]/jira/temp/$DB_DUMP

# tar and gzip Jira's data directory and pipe it to awscli
tar -cv /var/atlassian/application-data/jira/data | gzip | ~/.local/bin/aws s3 cp - s3://[BUCKET]/jira/temp/$DATA_DIR_ZIP

```

Credit to [loige.co](https://loige.co/aws-command-line-s3-content-from-stdin-or-to-stdout/) for the tip about using ` - ` with `awscli` to pipe straight from stdout to S3. I really appreciate that there's no need to deal with temporary files here. Obviously replace `[BUCKET]` with your S3 bucket. Here's [a handy dandy tip](https://isaacsukin.com/news/2013/06/command-line-tip-replace-word-all-files-directory) for running find and replace across multiple files simultaneously.

I run the scripts around 1am every day via [crontab](https://crontab.guru/every-day-at-1am), like so:

```sh
00 01 * * * /etc/cron.d/sync_jira.sh
```

If you're writing a cronjob, you'll want to run it manually to test it. Check out [this great SO post](https://serverfault.com/questions/85893/running-a-cron-job-manually-and-immediately/85906) for an easy strategy to run cronjobs manually with the same environment `crontab` will have.

I don't want old copies of my backups to build up *ad infinitum*, so I'm using [S3 object expiration](https://aws.amazon.com/blogs/aws/amazon-s3-object-expiration/) to automatically remove objects after 90 days. `awscli` documents an `--expires` flag, but in my 5 minutes of testing I was unable to apply it successfully. Regardless, the S3 console lets you manually set expirations by matching object prefixes. I match on a `[jira|confluence]temp/` prefix and set these objects to expire after 90 days. (To be clear, AWS doesn't let you regex prefixes AFAIK.) This means that I would lose any chance of retrieving my data if my server goes 90+ days without uploading new backups to S3. To ensure that that never happens, I run a separate cron job afterwards to overwrite a non-expirable "latest" backup with the newest copy.

```sh
#!/bin/bash

DB_DUMP=$(date +db_%Y%m%d.gz)
DATA_DIR_ZIP=$(date +data_%Y%m%d.tar.gz)

# copy newest files to latest position to avoid expiration
~/.local/bin/aws s3 cp s3://[BUCKET]/jira/temp/$DB_DUMP s3://[BUCKET]/jira/latest_db.gz
~/.local/bin/aws s3 cp s3://[BUCKET]/jira/temp/$DATA_DIR_ZIP s3://[BUCKET]/jira/latest_data.tar.gz
```

This job is run separately because it takes S3 a few moments to register the newest uploads. If you attempt to copy to "latest" too quickly, S3 will throw an error about unknown files. I'm sure you could throw a `sleep` in there after the initial upload in order to copy everything in the same script, but that feels overcomplicated. I just run these copy commands as a follow up script an hour later to avoid any problems.

This last bit about dealing with expirations might be overkill given what I was saying earlier about premature optimizations. However, I never want to touch this again and I don't want to worry about an ever-growing AWS bill :)

And that's it! Now I'm off to go check off the Jira task I made for this blog post.
