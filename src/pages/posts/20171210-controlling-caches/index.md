---
title: Controlling Caches
date: 2017-12-10T12:01:29-06:00
tags:
  - caching
  - blog
  - aws
  - s3
  - cloudfront
draft: false
---

After initially [deploying this blog](/posts/20171204-building-a-blog/) a few weeks ago, I noticed some weird tendencies / bugs every time I published a new post or updated an old one. The first was that routes that looked like `posts/date-title/` would almost always 404 with an S3 "missing key" error if you hit them directly. The second issue is that pages would often, but not always, throw errors immediately after deployments.

### Routing Issues

For instance, if you were to land on the main page and then click on a post, the app would perform client side routing to load the post and display a `posts/date-title/` URL, which worked (and still works) just fine. However, if you shared that `posts/date-title/` URL with someone else, they would get a 404. Interestingly `posts/date-title/index.html` still worked. This was obviously disconcerting and it's the main reason that I've been hesitant about actually sharing this site with other people.

After a few days of searching, I came across [this post](http://someguyontheinter.net/blog/serving-index-pages-from-a-non-root-location-via-cloudfront/) that finally put the pieces together. A `posts/date-title/` route works because the vast majority of server software automatically responds with `foo/index.html` when a request comes in for `foo/`. The [Gatsby CLI](https://www.npmjs.com/package/gatsby-cli) development server works this way, as does like every server I've ever worked with. I never considered that a bare S3 bucket does not follow this same behavior, but, in fact, it does not. Definitely goes to show that you should always check your assumptions!

I set up CloudFront to pull objects directly from my bucket. When a request comes in for `https://hurtlingthrough.space/posts/20171210-controlling-caches/index.html`, CloudFront makes a request to `my-s3-bucket.amazonaws.com/posts/20171210-controlling-caches/index.html` and returns the result to the original requester. This is good. However, when CloudFront tries to find the resource for a request like `https://hurtlingthrough.space/posts/20171210-controlling-caches/` (note the missing `index.html`), S3 interprets the request as one for the literal key `/posts/20171210-controlling-caches/`, treating the trailing `/` as a literal character as part of the key. This does not exist, so the "missing key" error gets returned to the original requester. This is bad.

The easiest fix was to simply turn on simple public serving from the S3 bucket, which graciously treats `foo/` as `foo/index.html`. I adjusted my CloudFront deployment to pull from the server insted of the bucket directly, and voila! Finally sane URLs. I'm not thrilled that my bucket itself is now publicly readable, but, at the same time, I'm willing to admit I'm just being anal retentive. It's not a big deal and it makes life a lot easier.

### Errors Following Deployments

After deploying any kind of change, I noticed that the site would sporadically err for the next few minutes. If I skipped (or cleared) the local cache, the page would load fine. But if I reloaded the page in a browser with an older version of the site cached, I would get errors. I realized that my [S3 uploader](https://www.npmjs.com/package/s3) had a `deleteRemoved: true` flag set. Rather than blindly uploading new files to S3, I tried to take a nuanced approach where I synced a directory containing the compiled files to the bucket. With `deleteRemoved: true` set, any files that were in the bucket but not in the directory being synced to it would get removed from S3.

Cached local copies of the site would request the old files, which no longer existed after a deployment. This is also bad. A simple swap for `deleteRemoved: false` and this behavior disappeared.

### General Caching Improvements

In the process of digging through the multiple layers of caching and requests that happen in the S3 -> CloudFront -> browser flow, I wound up making a few other changes to improve deployments and caching. I did some research into cache-control headers and set `Cache-Control: max-age` to 14 days for everything except HTML files, which are set to an hour. I'm assuming that JS and CSS will rarely change, while I'll want to make sure my content itself (and the homepage) won't get cached for long in the event that I want to update it.

I've thought about running AWS Lambda jobs to periodically bump `Cache-Control` up to 8 days on older HTML files, but the real-world performance boost would be pretty minor and I'm not convinced it's worth the effort.
