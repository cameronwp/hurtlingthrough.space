#!/usr/bin/env node

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const prompt = require('prompt');

// https://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
Date.prototype.toIsoString = function() {
  var tzo = -this.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };
  return this.getFullYear() +
      '-' + pad(this.getMonth() + 1) +
      '-' + pad(this.getDate()) +
      'T' + pad(this.getHours()) +
      ':' + pad(this.getMinutes()) +
      ':' + pad(this.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
}

const now = new Date();

let title = '';
let tags = [];
let newdirtitle = '';
let newdirectory = '';

function promptForTitle() {
  return new Promise((resolve, reject) => {
    prompt.message = '📖';
    prompt.delimiter = '  ';
    prompt.start();

    const params = {
      properties: {
        title: {
          message: 'Title of the new post',
          required: true
        },
        tags: {
          message: 'Comma separated tags'
        }
      }
    };

    prompt.get(params, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      title = result.title;
      tags = result.tags;
      resolve();
    });
  });
}

function buildDirectory() {
  const date = `${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
  newdirtitle = `${date}-${hyphenate(title)}`;
  newdirectory = directory(newdirtitle);

  return new Promise((resolve, reject) => {
    mkdirp(newdirectory, err => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve();
      }
    });
  });
}

function writeFile() {
  const data = `---
title: ${title}
date: ${now.toIsoString()}
tags: ${tags.length > 0 && yamlizeTags()}
layout: post
---

type something smart here
`

  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(newdirectory, 'index.md'), data, err => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve();
      }
    });
  })
}

function hyphenate() {
  return title.split(' ').map(word => {
    return word.toLowerCase()
  }).join('-');
}

function yamlizeTags() {
  const sep = `\n  - `;
  const list = tags.split(',').map(tag => {
    return tag.replace(/\s/g,'');
  })
  .join(sep);
  return `${sep}${list}`;
}

function directory(newdir) {
  return path.join(process.cwd(), 'src', 'pages', 'posts', newdir);
}


promptForTitle()
  .then(buildDirectory)
  .then(writeFile)
  .catch(console.error)
  .then(() => {
    console.log(`New post ready at src/pages/posts/${newdirtitle}/index.md`);
    process.exit(0)
  });
