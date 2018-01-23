# hurtlingthrough.space

Personal site and such: https://hurtlingthrough.space

[![CircleCI](https://circleci.com/gh/cameronwp/hurtling-through-space/tree/master.svg?style=shield&circle-token=471090fb75fbeb5b65d53f583c230c1232817f0e)](https://circleci.com/gh/cameronwp/hurtling-through-space/tree/master)

How it was built: [part 1](https://hurtlingthrough.space/posts/20171204-building-a-blog/) and [part 2](https://hurtlingthrough.space/posts/20171210-controlling-caches/).

## Installation

```sh
yarn
```

It's probably worth noting that this repo uses a custom Gatsby plugin for processing markdown images (see plugins/gatsby-remark-images-full-width).

## New Post

```sh
yarn new
```

Note that new posts automatically are set to `draft: true`. Change this to `draft: false` when you're ready to publish. Note that posts with `draft: true` do not show up in the homepage, but are still accessible directly.

NOTE: posts that are `draft: true` in the `master` branch will show up in rss.xml! Strongly advise avoiding merging drafts into master. Use the `--preview` flow described below instead.

## Fun with Frontmatter

### Publish a post

```md
draft: false
```

### Custom twitter prompt

Twitter prompts default to "Check out 'title' URL via @cwpittman". Prompts will always end with the URL and "via @cwpittman", but you can change the first part.
```md
twitterprompt: Cameron makes a huge mistake.
```

This makes the Twitter prompt: "Cameron makes a huge mistake. https://hurtlingthrough.space/... via @cwpittman"

### Custom summary

The homepage will either display the excerpt for each post (the first ~200 chars?) or a predefined summary.

```md
summary: A day in the life of my dog. Her perspective on going to the park, sniffing butts, and more with lots of pictures.
```

## Running in development

`yarn develop`

## Publishing

Note that you must set `draft: false` in the frontmatter of whatever posts you
want to be public.

All merges to `master` automatically get published.

If you want to publish manually, run `yarn deploy` (with the env vars detailed below). It will `gatsby build` the production files and will run `./bin/deploy.js` to upload public/ to S3 and invalidate the CloudFront cache.

Create a `.env` file in the root of the repo with the following environment variables:

```sh
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
BUCKET=
CLOUDFRONT_DISTRIBUTION_ID=
```

If you set up a CircleCI deployment, you'll need to set the aforementioned environment variables in the project settings. You can deploy to an S3 bucket called `preview.[BUCKET]` if you append `--preview` to the branch name.

## Troubleshooting

* `gatsby-transformer-remark` seems to barf on `[links](https://example.com/something_like_this)` with `_` in them. Replace the `_`s in the URL with their URL encoding, `%5F` and you should be good to go, eg. `[links](https://example.com/something%5Flike%5Fthis)`.
