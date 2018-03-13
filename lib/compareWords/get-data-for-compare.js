'use strict';

const {
  COMPARE_TYPE_PAIR,
  COMPARE_TYPE_RANGE_OF_VALUES,
} = require('./constants');

const getInterval = (firstArray, secondArray) => {
  const data = {};

  data.type = COMPARE_TYPE_RANGE_OF_VALUES;
  data.firstArray = firstArray;
  data.secondArray = secondArray;

  return data;
};

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

    if (index === pairs.length - 1) {
      const firstArrayAfterPair = firstArray.slice(firstArrayStartIndex, firstArray.length);
      const secondArrayAfterPair = secondArray.slice(secondArrayStartIndex, secondArray.length);
      const dataAfterPair = getInterval(firstArrayAfterPair, secondArrayAfterPair);

      data.push(dataAfterPair);
    }
  });
  return data;
};

module.exports = getDataForCompare;