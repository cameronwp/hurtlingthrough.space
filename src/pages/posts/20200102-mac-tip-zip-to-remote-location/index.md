---
title: "Mac Tip: Zip to Remote Location"
date: 2020-01-02T11:04:09-05:00
tags: 
  - zip
  - mac
summary: Using ditto to get data off a Mac
draft: false
---

I recently traded in my 2012 MacBook Pro. Beforehand I wanted to backup my personal files _en masse_ just in case something slipped under the radar when I was rumaging through them for anything useful. Here's how to zip a local directory to a remote location, which was super useful for neatly zipping my whole home directory to my NAS.

Given a directory `backup` and a directory mounted at `/Volumes/NAS`:

```sh
ditto -c -k --sequesterRsrc --keepParent backup /Volumes/NAS/Backup\ 1/backup.zip
```

Run with `-V` to print the current file being zipped (but note that will significantly slow down the process).

[Source](https://discussions.apple.com/thread/4235911)
