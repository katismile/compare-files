'use strict';

const compare = require('./compare');

const compareWords = (firstString, secondString, separator) => {
  const array1 = firstString.split(separator);
  const array2 = secondString.split(separator);

  return compare(array1, array2);
};

module.exports = compareWords;