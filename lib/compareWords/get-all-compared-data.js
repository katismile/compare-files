'use strict';

const getChangedValues = require('./get-changed-values');

const {
  TYPE_PAIR,
  COMPARE_TYPE_PAIR,
  COMPARE_TYPE_RANGE_OF_VALUES,
} = require('./constants');

const getAllChangedData = (data) => {
  return data.reduce((result, element) => {

    switch(element.type) {
      case COMPARE_TYPE_PAIR: {
        result.push(Object.assign(element, {
          type: TYPE_PAIR
        }));
        return result;
      }
      case COMPARE_TYPE_RANGE_OF_VALUES: {
        const changedValues = getChangedValues(element.firstArray, element.secondArray);
        return [...result, ...changedValues];
      }
      default: {
        return result;
      }
    }
  }, []);
};
module.exports = getAllChangedData;