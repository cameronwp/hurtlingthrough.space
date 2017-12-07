# hurtlingthrough.space

Personal site and such. Published at [hurtlingthrough.space](https://hurtlingthrough.space).

## New Post

```sh
yarn new
```

## Running in development

`gatsby develop`

## Publishing

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
