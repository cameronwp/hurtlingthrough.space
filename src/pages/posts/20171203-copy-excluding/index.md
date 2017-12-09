---
title: Copy directories while excluding files
date: 2017-12-03T22:13:32-06:00
tags:
  - rsync
  - unix
draft: false
---

I'm building this blog with [Gatsby](https://gatsbyjs.org), a tool for
generating static sites relatively easily using a mix of React and markdown.
I've spent the day pulling down starter kits and playing with them. Now that (I
think) I have a relatively useful setup, it's time to check in my work. If
you're swapping starter kits in an out, you may find that you need to swap
`./git`s around, or you don't want to copy them at all. Here's a tip to help
out.

### Copy directories while excluding files

```bash
rsync -av source/ dest/ --exclude somepath
```

[`rsync`](https://linux.die.net/man/1/rsync) is a Swiss Army knife of file
management awesomeness.
