#!/usr/bin/env node

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const prompt = require('prompt');

function twoDigitPad(num) {
  const norm = Math.floor(Math.abs(num));
  return (norm < 10 ? '0' : '') + norm;
}

// credit https://goo.gl/Ss9T1v
function getLocalISO(date) {
  const tzo = -date.getTimezoneOffset();
  const dif = tzo >= 0 ? '+' : '-';
  return date.getFullYear() +
      '-' + twoDigitPad(date.getMonth() + 1) +
      '-' + twoDigitPad(date.getDate()) +
      'T' + twoDigitPad(date.getHours()) +
      ':' + twoDigitPad(date.getMinutes()) +
      ':' + twoDigitPad(date.getSeconds()) +
      dif + twoDigitPad(tzo / 60) +
      ':' + twoDigitPad(tzo % 60);
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
      } else {
        title = result.title;
        tags = result.tags;
        resolve();
      }
    });
  });
}

function buildDirectory() {
  const date = `${now.getFullYear()}${twoDigitPad(now.getMonth()+1)}${twoDigitPad(now.getDate())}`;
  newdirtitle = `${date}-${hyphenate(title)}`;
  newdirectory = directory(newdirtitle);

  return new Promise((resolve, reject) => {
    mkdirp(newdirectory, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function writeFile() {
  const data = `---
title: ${title}
date: ${getLocalISO(now)}
tags: ${tags.length > 0 && yamlizeTags()}
draft: true
---

type something smart here
`

  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(newdirectory, 'index.md'), data, err => {
      if (err) {
        reject(err);
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
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .then(() => {
    console.log(`New post ready at src/pages/posts/${newdirtitle}/index.md`);
    process.exit(0);
  });
