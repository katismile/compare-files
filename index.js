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
  const firstFileData = await readFile(firstFilePath, "utf8");
  const secondFileData = await readFile(secondFilePath, "utf8");

  const data = compareWords(firstFileData, secondFileData);

  const result = format(data);
  process.stdout.write(result);
};

compareFiles(firstFilePath, secondFilePath);