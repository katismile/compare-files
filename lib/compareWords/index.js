'use strict';

const compareArrays = require('./compare-arrays');

/**
 * Compare words and define different changes in two strings
 *
 * @param {String} firstString
 * @param {String} secondString
 *
 * @return {Object}
 */

const compareWords = (firstString, secondString) => {
  const separator = '\n';
  const firstArray = firstString.split(separator);
  const secondArray = secondString.split(separator);

  return compareArrays(firstArray, secondArray);
};

module.exports = compareWords;