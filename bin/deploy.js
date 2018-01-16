#!/usr/bin/env node

if (process.env.CIRCLECI !== 'true') {
  require('dotenv').config()
}

const AWS = require('aws-sdk');
const s3 = require('s3');
const fs = require('fs');
const _ = require('lodash');

AWS.config.apiVersions = {
  s3: '2006-03-01',
  cloudfront:'2017-03-25'
};
AWS.config.update({region: process.env.AWS_REGION});

const isPreviewDeploy = /.*\-\-preview$/g.test(process.env.CIRCLE_BRANCH)

function uploadFiles() {
  return new Promise((resolve, reject) => {
    const awsS3Client = new AWS.S3();
    const config = {
      s3Client: awsS3Client
    };
    const client = s3.createClient(config);
    const bucket = `${isPreviewDeploy ? 'preview.' : ''}${process.env.BUCKET}`;

    const uploader = client.uploadDir({
      localDir: 'public',
      deleteRemoved: false, // don't remove old files in case they're still being used by a cache
      s3Params: {
        Bucket: bucket
      },
      getS3Params: (filepath, stat, callback) => {
        // do not cache non-static files, everything else cached 1 year
        // https://www.gatsbyjs.org/docs/caching/

        const baseParams = {
          ACL: 'public-read',
          CacheControl: 'public, max-age=0, must-revalidate'
        };

        const cacheParams = {
          CacheControl: 'public, max-age=31536000, immutable'
        };

        const isStatic = /\/static\//g.test(filepath);
        const params = _.assign(baseParams, isStatic ? cacheParams : {});

        callback(null, params);
      }
    });
    uploader.on('error', reject);
    uploader.on('end', () => {
      console.log(`Success uploading files to ${bucket}`);
      resolve()
    });
  })
}

function invalidateCache() {
  return new Promise((resolve, reject) => {
    // don't invalidate the cache if we aren't updating prod
    if (isPreviewDeploy) {
      return resolve();
    }

    const cloudfront = new AWS.CloudFront();
    const reference = Date.now();

    const invalidation = {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: reference.toString(),
        Paths: {
          Quantity: 1,
          Items: ['/*'] // just assume everything has been invalidated
        }
      }
    };
    cloudfront.createInvalidation(invalidation, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log('Success invalidating cache');
        console.log(data);
        resolve();
      }
    });
  })
}

uploadFiles()
  .then(invalidateCache)
  .catch(e => console.error)
  .then(() => process.exit(0));
