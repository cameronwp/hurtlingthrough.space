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
AWS.config.update({region: process.env.AWS_REGION});

function uploadFiles() {
  return new Promise((resolve, reject) => {
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
      },
      getS3Params: (localFile, stat, callback) => {
        callback(null, {
          CacheControl: 'max-age=691200'  // 8 days
        });
      }
    });
    uploader.on('error', function(err) {
      console.error(err);
      reject(err);
    });
    uploader.on('progress', function() {
      if (process.env.CIRCLECI !== 'true') {
        const percent = `${((uploader.progressAmount / uploader.progressTotal) * 100).toFixed(2) || 0}%`;
        console.log(percent);
      }
    });
    uploader.on('end', function() {
      resolve();
    });
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
          Items: [
            '/*'
          ]
        }
      }
    };
    cloudfront.createInvalidation(invalidation, (err, data) => {
      if (err) {
        console.error(err);
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
