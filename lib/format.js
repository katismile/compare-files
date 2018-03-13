'use strict';

const { TYPE_ADDED, TYPE_DELETED, TYPE_CHANGED, TYPE_PAIR } = require('./compareWords/constants');

const mapData = {
  [TYPE_ADDED]: '+',
  [TYPE_DELETED]: '-',
  [TYPE_CHANGED]: '*',
  [TYPE_PAIR]: ' '
};

const format = (data) => {
  return data.reduce((result, element, index) => {
    const firstColumn = index + 1;
    const secondColumn = mapData[element.type];
    const thirdColumn = getThirdColumnTitle(element);
    const separator = '\n';

    const newLine = `${firstColumn} ${secondColumn} ${thirdColumn} ${separator}`;
    result += newLine;

    return result;
  }, '');
};

function getThirdColumnTitle(data) {
  const { type } = data;

  switch (type) {
    case TYPE_ADDED:
    case TYPE_PAIR:
    case TYPE_DELETED: {
      return data.value;
    }
    case TYPE_CHANGED: {
      return data.firstValue + '|' + data.secondValue;
    }
    default: {
      return '';
    }
  }
}

module.exports = format;