'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const compareWords = require('./lib/compare-words/index');
const format = require('./lib/format');

const [firstFileName, secondFileName] = process.argv.slice(-2);
const firstFilePath = `${__dirname}/files/${firstFileName}`;
const secondFilePath = `${__dirname}/files/${secondFileName}`;

const compareFiles = async (firstFilePath, secondFilePath) => {
  try {
    const firstFileData = await readFile(firstFilePath, 'utf8');
    const secondFileData = await readFile(secondFilePath, 'utf8');

    const data = compareWords(firstFileData, secondFileData);

    return format(data);
  } catch (error) {
    throw new Error('Invalid input params');
  }
};

compareFiles(firstFilePath, secondFilePath)
  .then(console.log)
  .catch(console.error);