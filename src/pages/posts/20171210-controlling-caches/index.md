---
title: Controlling Caches
date: 2017-12-10T12:01:29-06:00
tags:
  - caching
  - browsers
  - aws
  - s3
  - cloudfront
draft: true
---

* deleteRemoved: false
* cache-control: max-age
* invalidating
* browsers kept old versions, which is totally fine. but the cloudfront caches had been killed and the files were deleted from s3. so requests from old versions died
* http://someguyontheinter.net/blog/serving-index-pages-from-a-non-root-location-via-cloudfront/