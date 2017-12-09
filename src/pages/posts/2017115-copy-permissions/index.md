---
title: Copy Permissions
date: 2017-12-05T12:28:45-06:00
tags:
  - unix
  - chmod
  - tip
draft: false
---

If you're lazy about permissions, `chmod` and `chown` both take a `--reference` flag to set permissions equal to those of another file.

```sh
chmod --reference=file/with/good/permissions file/with/permissions/to/fix
```

This comes up for us in a Rails app that we generally run in a Docker container. When we `bin/rake generate migration`, the new migration file is owned by `root`, which is annoying. A better next step might be to stop running the app inside a container in dev, but that's a different piece of work altogether.

[More usefulness about `chown` and `chmod` flags here.](https://www.cyberciti.biz/faq/how-to-copy-permissions-from-one-file-to-another-on-linux/)
