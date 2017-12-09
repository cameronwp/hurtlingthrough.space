# hurtlingthrough.space

Personal site and such. Published at [hurtlingthrough.space](https://hurtlingthrough.space).

Based on [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog).

## New Post

```sh
yarn new
```

Note that new posts automatically are set to `draft: true`. Change this to `draft: false` when you're ready to publish. Note that pages with `draft: true`
do not show up in the homepage, but are still accessible directly.

## Fun with Frontmatter

### Publish a post.

```md
draft: false
```

### Custom twitter prompt

Twitter prompts default to "Check out 'title' URL via @cwpittman". Prompts will always end with the URL and "via @cwpittman", but you can change the first part.
```md
twitterprompt: Cameron makes a huge mistake.
```

This makes the Twitter prompt: "Cameron makes a huge mistake. https://hurtlingthrough.space/... via @cwpittman"

## Running in development

`gatsby develop`

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

If you set up a CircleCI deployment, you'll need to set the aforementioned environment variables in the project settings.
