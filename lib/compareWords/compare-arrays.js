'use strict';

const findPairs = require('./find-pairs');
const getDataForCompare = require('./get-data-for-compare');
const getAllChangedData = require('./get-all-compared-data');

/**
 * Compare arrays and get data with compare type [added, deleted, changed or pair] on each line
 *
 * @param {Array} firstArray
 * @param {Array} secondArray
 *
 * @return {Object}
 */

const compareArrays = (firstArray, secondArray) => {
  const pairs = findPairs(firstArray, secondArray);

  const dataForCompare = getDataForCompare(pairs, firstArray, secondArray);

  return getAllChangedData(dataForCompare);
};

module.exports = compareArrays;