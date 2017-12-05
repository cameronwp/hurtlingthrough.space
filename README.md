# hurtlingthrough.space

Personal site and such. Published at [hurtlingthrough.space](https://hurtlingthrough.space).

## New Post

```sh
yarn new
```

## Running in development

`gatsby develop`

## Publishing

Merges to `master` automatically get published.

Running bin/deploy.js uploads public/ to S3 and invalidates the CloudFront cache.

You can run the deploy script locally with `yarn deploy`.

Create a `.env` file in the root of the repo with the following environment variables:

```sh
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
BUCKET=
CLOUDFRONT_DISTRIBUTION_ID=
```

If you set up a CircleCI deployment, you'll need to set the aforementioned environment variables in the project settings.
