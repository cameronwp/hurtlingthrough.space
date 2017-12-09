---
title: Building a Blog
date: 2017-12-04T12:26:35-06:00
tags:
  - gatsbyjs
  - blog
  - aws
  - s3
  - cloudfront
  - circleci
  - git
draft: false
---

Aside from a few one off submissions to the official Udacity blog, I haven't blogged in years.<sup>1</sup> I made my old blog, [physicswithportals.com](https://physicswithportals.com), to describe my experiences as a physics teacher using _Portal 2_. The teaching stage of life is well behind me now with my new professional focus on the software and aerospace varieties of engineering. So, I made _Hurtling through Space_.

Being an anal-retentive engineer, I wanted my blog publishing flow to match the same flow I use when deploying sites. And I wanted to make sure it's secure, fast, easy to deploy, and easy to work with. Here's how I put it together.

## Final Product

[Repo](https://github.com/cameronwp/personal-web) (Feel free to fork!)

* Blog: [GatsbyJS](https://gatsbyjs.org) (written in [React](https://reactjs.org/))
* Hosting: [S3](https://aws.amazon.com/s3/pricing/)
* CDN: [CloudFront](https://aws.amazon.com/cloudfront/pricing/)
* Deploy: [CircleCI](https://circleci.com/)
* VCS: [GitHub](https://github.com)

## Requirements (or "How to Make a Simple Task More Difficult Than It Needs to Be")

* **Must serve over HTTPS.** It is the way of the future. Sites are already [getting shamed](https://motherboard.vice.com/en_us/article/xygdxq/google-will-soon-shame-all-websites-that-are-unencrypted-chrome-https) for not using HTTPS.
* **Must be version controled with `git`.** I regularly work on multiple machines. Version control systems make life easy. Furthermore, I wanted to use `master` to deploy (more on this in **Workflow**).
* **Must be able to write long form text with markdown.** Markdown is faster and easier to write than HTML. This requirement means that I need a way to convert markdown to HTML as part of the deployment process.
* **Must be able to modify the UI using a JS framework.** I'm not going to enjoy writing a blog if I can't have fun with the UI :) Bonus points for React.
* **Must be able to build static pages.** I wanted a cheap hosting solution, which means that I would be uploading static files. An SPA _could_ work, but being able to serve static pages for each blog post gives me more hosting flexibility.

## Workflow (or "Unnecessary Cloud Work")

At work, we follow the philosophy that for a given version controled system, it is the responsibility of the system to match the `master` branch automatically. We follow the "`master` is staging, `production` is production" flow<sup>2</sup>, where merging commits into either branch triggers a deployment with the latest changes. I wanted the same for the blog, where a merge into `master` automatically publishes changes.

I also wanted to avoid setting up deployment configurations on each machine where I might work. It's tedious, fragile and likely means adding manual work beyond `git push origin master` to trigger a deployment. This means I need a service to listen for changes to `master` and deploy when triggered.

## Research

### The Blog Itself

I started looking at [Jekyll](https://jekyllrb.com/) as I've heard a lot of good things. I shied away from it when I realized that you essentially define Rails templates for your content. Given a choice, I prefer not to use Rails, so I kept looking.

I considered setting up custom [Webpack](https://webpack.js.org/) tasks to meet my requirements, but, to be honest, Webpack configs feel like black magic. Webpack is amazingly powerful, but it's one of those tools you want to set and forget and never think about again.

I stumbled upon [GatsbyJS](https://gatsbyjs.org), which, similar to Jekyll, runs a development server that can compile markdown into static files. You define UI components with React, which is awesome. I went with Gatsby to keep the flexibility of long-form writing with markdown and fun with the UI using React.

### Hosting

The simplest approach to hosting would probably have been GitHub pages. It's brain-dead simple to use regardless, but Gatsby even offers plugins to deploy to it. Unfortunately, GitHub pages doesn't really [support HTTPS with custom domains](https://hackernoon.com/set-up-ssl-on-github-pages-with-custom-domains-for-free-a576bdf51bc), which knocked it out of the running. (Ok, you can just use CloudFlare to cache GitHub pages, and then use SSL there, which is effectively what I wound up doing with AWS. I may even switch to GitHub pages in the future if S3 somehow gets expensive / not worth the hassle.)

The next simplest option was [Surge](https://surge.sh/), which reminded me of a Heroku for static sites. It seemed reasonable, but I didn't like that SSL and HTTPS control would cost $13/mo. Given the relatively low traffic I expect, I _think_ I can get away with a lot less.

I eventually landed on S3 and CloudFront. S3 is super easy to use, and pricing for the two seems pretty reasonable. I'm also a control freak, so I enjoy the power and flexibility of AWS in general.

### Deployment

There really was no question here about a provider. I've used CircleCI quite a bit and it's easy to use. There's also a nice [free-tier](https://circleci.com/pricing/) that's more than capable for what I need.

I decided to write a few node scripts to handle uploading files from CircleCI to S3, as well as invaliding the CloudFront cache.

## Process

### Build Site

Gatsby makes it relatively easy to generate a static site, except for a few issues, notably a lack of documentation. Behind the scenes, the Gatsby server runs a GraphQL API to query markdown posts. This is super neat, as GraphQL is wicked flexible. However! It's not documented whatsoever, as far as I can tell. And the [official tutorial](https://www.gatsbyjs.org/blog/2017-07-19-creating-a-blog-with-gatsby/) had GraphQL syntax errors. Given the amount of time I allocated to setting up the blog (just an afternoon), I didn't want to waste time forensic'ing valid queries. Luckily, the [starter kit blog](https://github.com/gatsbyjs/gatsby-starter-blog) worked just fine.

Note that you'll need to add src/pages/404.js and src/html.js.

The starter kit uses a Wordpress theme, which actually looks pretty nice. I wound up poking around and figuring out how to change fonts and overwrite styles.

I wound up writing a script (triggered with `yarn new`) that prompts for a post title and tags (still need to actually do something with tags), and generates a snazzy prepopulated markdown file for the post with the correct dates filled in.

### Buy domain

Last year, I bought a half dozen '.space' domains, my favorite being this one. Up until a few days ago, it redirected to [a YouTube video of something like the classic Windows space screensaver](https://www.youtube.com/watch?v=tdnKOnSdGbc).

### Hosting and CDN

Creating a new S3 bucket is fairly easy, as is setting up CloudFront. I wound up following [this walkthrough](https://www.h3xed.com/web-development/using-https-with-amazon-s3-and-your-domain) to connect everything.

I was able to keep my [S3 bucket private while only allowing CloudFront access](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html). This is probably overkill, because the objects are part of a public blog. But keeping the bucket private means that I restrict content access to my domain, and it removes the possibility of accidentally allowing write access to the Internet.

### Deployment

Any pushes to GitHub trigger a [CircleCI](https://circleci.com/) build, which is configured [here](https://github.com/cameronwp/personal-web/blob/master/.circleci/config.yml)). If the branch happens to be `master`:
1. it generates new static files in public/
2. it uploads the public/ directory to S3
3. it invalidates CloudFront's cache, so that changes go live in less than a minute instead of when caches expire.

## What's Next?

* Generating tag indicies for easy sorting / searching.
* Get more precise about invalidating the cache. It technically [costs money](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html#PayingForInvalidation) to invalidate the cache. I _think_ I'm good just invaliding `/*`, which counts as 1 invalidation. I really only need to invalidate the root page only when a new post is published, so I could get clever with `git diff` to determine when invalidation needs to happen. Also, it feels like using dynamite to kill a mouse with invalidating _everything_ in the cache. I should spend some time with cache headers and TTL, which, in all reality, could obviate the need to invalidate the cache.
* Write more! And probably play with the styles a bit.

---

<sub>1. But I've still written a lot! There are probably hundreds of hours of Udacity content that I've authored.</sub>

<sub>2. We have a few random repos where we do `develop` is staging, `master` is production, but those are few and far between. There also was a repo where `dangerzone` was production.</sub>
