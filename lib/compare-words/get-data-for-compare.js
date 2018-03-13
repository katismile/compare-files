'use strict';

const {
  COMPARE_TYPE_PAIR,
  COMPARE_TYPE_RANGE_OF_VALUES,
} = require('./constants');

/**
 * Get data with compare type [COMPARE_TYPE_RANGE_OF_VALUES]
 *
 * @param {Array} firstArray
 * @param {Array} secondArray
 *
 * @return {Object}
 */

const getInterval = (firstArray, secondArray) => {
  const data = {};

  data.type = COMPARE_TYPE_RANGE_OF_VALUES;
  data.firstArray = firstArray;
  data.secondArray = secondArray;

  return data;
};

/**
 * Get data for compare depending on ranges of changes values and non changed values [pairs]
 *
 * @param {Array} pairs - non changed values
 * @param {Array} firstArray
 * @param {Array}  secondArray
 *
 * @return {Array}
 */

const getDataForCompare = (pairs, firstArray, secondArray) => {
  const data = [];

  if (!pairs.length) {
    const dataBeforePair = getInterval(firstArray, secondArray);
    data.push(dataBeforePair);
    return data;
  }

  let firstArrayStartIndex = 0;
  let secondArrayStartIndex = 0;

  pairs.forEach((pair, index) => {
    const isPairsCloseToEachOther = index - firstArrayStartIndex === 1;

    if (!isPairsCloseToEachOther) {
      const firstArrayByPair = firstArray.slice(firstArrayStartIndex, pair.firstIndex);
      const secondArrayByPair = secondArray.slice(secondArrayStartIndex, pair.secondIndex);
      const dataBeforePair = getInterval(firstArrayByPair, secondArrayByPair);

      data.push(dataBeforePair);
    }

    firstArrayStartIndex = pair.firstIndex;
    secondArrayStartIndex = pair.secondIndex;

    data.push(Object.assign(pair, {
      type: COMPARE_TYPE_PAIR
    }));

    const isLastElement = index === pairs.length - 1;

    if (isLastElement) {
      const firstArrayAfterPair = firstArray.slice(firstArrayStartIndex, firstArray.length);
      const secondArrayAfterPair = secondArray.slice(secondArrayStartIndex, secondArray.length);
      const dataAfterPair = getInterval(firstArrayAfterPair, secondArrayAfterPair);

      data.push(dataAfterPair);
    }
  });
  return data;
};

module.exports = getDataForCompare;