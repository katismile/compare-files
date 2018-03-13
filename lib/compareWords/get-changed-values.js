'use strict';

const { TYPE_ADDED, TYPE_DELETED, TYPE_CHANGED } = require('./constants');

const getChangedValues = (firstArray, secondArray) => {
  const result = firstArray.reduce((data, element, index) => {
    const secondValue = secondArray[index];

    if (secondValue && secondValue !== element) {
      data.push({
        type: TYPE_CHANGED,
        firstValue: element,
        secondValue: secondValue
      });
    } else if (!secondValue) {
      data.push({
        type: TYPE_DELETED,
        value: element
      });
    }
    return data;
  }, []);

  if (firstArray.length > secondArray.length) {
    return result;
  }

  const addedValues = secondArray.slice(firstArray.length, secondArray.length);

  const updatedResult = addedValues.reduce((data, element) => {
    data.push({
      type: TYPE_ADDED,
      value: element
    });

    return data;
  }, result);

  return updatedResult;
};

module.exports = getChangedValues;