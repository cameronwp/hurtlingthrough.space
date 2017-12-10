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

let filesChanged = [];

function getFileDiffList() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', chunk => {
      data += chunk;
    });

    process.stdin.on('end', () => {
      filesChanged = data.split('\n');
      resolve();
    });

    process.stdin.on('error', reject);
  })
}

function uploadFiles() {
  return new Promise((resolve, reject) => {
    resolve();
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

    // get posts, tags that changed
    const devPath = 'src/pages'
    filesChanged = filesChanged.filter(f => {
      return _.startsWith(f, devPath)
    }).map(f => {
      return f.replace(devPath, '').replace('index.md', 'index.html');
    });

    const objectsToInvalidate = _.union(filesChanged, [
      '/index.html',
      '/offline-plugin-app-shell-fallback/index.html',
      '/tags/index.html',
      '/rss.xml',
      '/styles.css'
    ]);

    console.log('invalidating: ', objectsToInvalidate);
    resolve()

    const invalidation = {
      DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: reference.toString(),
        Paths: {
          Quantity: objectsToInvalidate.length,
          Items: objectsToInvalidate
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

getFileDiffList()
  .then(uploadFiles)
  .then(invalidateCache)
  .catch(e => console.error)
  .then(() => process.exit(0));
