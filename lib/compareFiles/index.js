'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const compare = require('./compare');
const format = require('./format');

const separator = '\n';

const compareFiles = async (firstFilePath, secondFilePath) => {
  const result1 = await readFile(firstFilePath, "utf8");
  const result2 = await readFile(secondFilePath, "utf8");

  const array1 = result1.split(separator);
  const array2 = result2.split(separator);

  const data = compare(array1, array2);

  const result = format(data);
  process.stdout.write(result);
};

module.exports = compareFiles;