'use strict';

const findPairs = require('./find-pairs');
const getDataForCompare = require('./get-data-for-compare');
const getAllChangedData = require('./get-all-compared-data');

const compareArrays = (firstArray, secondArray) => {
  const pairs = findPairs(firstArray, secondArray);

  const dataForCompare = getDataForCompare(pairs, firstArray, secondArray);

  return getAllChangedData(dataForCompare);
};

module.exports = compareArrays;