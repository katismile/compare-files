'use strict';

const compareFiles = require('./lib/compareFiles/index');

const argv = process.argv.slice(-2);
const filePath = __dirname;
const directory = 'files';
const firstFilePath = filePath + '/' + directory + '/' + argv[0];
const secondFilePath = filePath + '/' + directory + '/' + argv[1];

compareFiles(firstFilePath, secondFilePath);