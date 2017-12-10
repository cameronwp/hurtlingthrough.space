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

function uploadFiles() {
  return new Promise((resolve, reject) => {
    const awsS3Client = new AWS.S3();
    const config = {
      s3Client: awsS3Client
    };
    const client = s3.createClient(config);

    const uploader = client.uploadDir({
      localDir: 'public',
      deleteRemoved: false, // don't remove old files in case they're still being used by a cache
      s3Params: {
        Bucket: process.env.BUCKET
      },
      getS3Params: (localFile, stat, callback) => {
        // cache HTML files (and rss.xml) for an hour, everything else 14 days
        const isHTML = _.endsWith(localFile, '.html')
        const isXML = _.endsWith(localFile, '.xml')
        const params = {
          ACL: 'public-read',
          CacheControl: `max-age=${(isHTML || isXML ? '3600' : '1209600')}`
        }
        callback(null, params);
      }
    });
    uploader.on('error', reject);
    uploader.on('end', () => resolve());
  })
}

function invalidateCache() {
  return new Promise((resolve, reject) => {
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
