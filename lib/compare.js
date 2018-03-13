'use strict';

const { TYPE_ADDED, TYPE_DELETED, TYPE_CHANGED, TYPE_PAIR } = require('../constants');

const compare = (firstArray, secondArray) => {
  const { pairs, firstArrayPairIndexes, secondArrayPairIndexes } = findPairs(firstArray, secondArray);

  const result = firstArray.reduce((data, element, index) => {
    const pairExists = firstArrayPairIndexes.find(pairIndex => pairIndex === index);

    if (pairExists) {
      const pair = pairs.find(pair => pair.firstIndex === index);
      data.push(Object.assign(pair, {
        type: TYPE_PAIR
      }));
      return data;
    }

    const firstArrayValue = element;
    const pairIndex = secondArrayPairIndexes.find(pairIndex => pairIndex === index);
    const secondArrayValue = pairIndex <= index ? null : secondArray[index];

    if (secondArrayValue && firstArrayValue !== secondArrayValue) {
      data.push({
        type: TYPE_CHANGED,
        firstValue: firstArrayValue,
        secondValue: secondArrayValue
      })
    } else if (!secondArrayValue) {
      data.push({
        type: TYPE_DELETED,
        value: firstArrayValue
      })
    }

    return data;
  }, []);

  if (firstArray.length > secondArray.length) {
    return result;
  }
  
  let secondArrayStartIndex = firstArray.length;
  
  if (pairs.length) {
    const lastPair = pairs.pop();
    secondArrayStartIndex = lastPair.secondIndex + 1;
  }
  const addedValues = secondArray.slice(secondArrayStartIndex, secondArray.length);

  return addedValues.reduce((data, element) => {
    data.push({
      type: TYPE_ADDED,
      value: element
    });

    return data;
  }, result);
};

function findPairs(firstArray, secondArray) {
  return firstArray.reduce((data, currentElement, index) => {
    const arrayReversed = data.pairs.reverse();

    const existingPair = arrayReversed.find(el => el.value === currentElement);

    const existingPairIndex = existingPair ? existingPair.firstIndex + 1 : 0;

    const pair = secondArray.find((el, index) => {
      return el === currentElement && index >= existingPairIndex;
    });

    if (!pair) {
      return data;
    }

    const pairIndex = secondArray.indexOf(pair);

    data.firstArrayPairIndexes.push(index);
    data.secondArrayPairIndexes.push(pairIndex);
    data.pairs.push({
      firstIndex: index,
      secondIndex: pairIndex,
      value: currentElement
    });

    return data;
  }, {
    firstArrayPairIndexes: [],
    secondArrayPairIndexes: [],
    pairs: []
  });
}

module.exports = compare;