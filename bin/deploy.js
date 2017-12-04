#!/usr/bin/env node

if (process.env.CIRCLECI !== 'true') {
  require('dotenv').config()
}

const AWS = require('aws-sdk');
const s3 = require('s3');
const fs = require('fs');

AWS.config.apiVersions = {
  s3: '2006-03-01',
  cloudfront:'2017-03-25'
};
AWS.config.update({region: 'us-east-1'});

/* upload new files */

const awsS3Client = new AWS.S3();

const config = {
  s3Client: awsS3Client
};
const client = s3.createClient(config);

const uploader = client.uploadDir({
  localDir: "public",
  deleteRemoved: true,
  s3Params: {
    Bucket: process.env.BUCKET
  }
});
uploader.on('error', function(err) {
  console.error(err);
  process.exit(1)
});
uploader.on('progress', function() {
  if (process.env.CIRCLECI !== 'true') {
    const percent = `${((uploader.progressAmount / uploader.progressTotal) * 100).toFixed(2) || 0}%`;
    console.log(percent);
  }
});
uploader.on('end', function() {
  console.log("done!");
});

/* invalidate old common files */

const reference = Date.now();

const cloudfront = new AWS.CloudFront();
const invalidation = {
  DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
  InvalidationBatch: {
    CallerReference: reference.toString(),
    Paths: {
      Quantity: 1,
      Items: [
        '/*'
      ]
    }
  }
};
cloudfront.createInvalidation(invalidation, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(data);
    process.exit(0);
  }
});
