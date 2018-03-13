'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const compareWords = require('./lib/compare-words/index');
const format = require('./lib/format');

const argv = process.argv.slice(-2);
const filePath = __dirname;
const directory = 'files';
const firstFilePath = filePath + '/' + directory + '/' + argv[0];
const secondFilePath = filePath + '/' + directory + '/' + argv[1];

const compareFiles = async (firstFilePath, secondFilePath) => {
  try {
    const firstFileData = await readFile(firstFilePath, "utf8");
    const secondFileData = await readFile(secondFilePath, "utf8");

    const data = compareWords(firstFileData, secondFileData);

    return format(data);
  } catch (error) {
    throw new Error('Invalid request');
  }
};

compareFiles(firstFilePath, secondFilePath)
  .then(result => process.stdout.write(result))
  .catch(error => console.error(error));