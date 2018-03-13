'use strict';

const compareArrays = require('./compare-arrays');

const compareWords = (firstString, secondString) => {
  const separator = '\n';
  const firstArray = firstString.split(separator);
  const secondArray = secondString.split(separator);

  return compareArrays(firstArray, secondArray);
};

module.exports = compareWords;