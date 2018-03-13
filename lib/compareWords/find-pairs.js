'use strict';

const findPairs = (firstArray, secondArray) => {
  return firstArray.reduce((data, currentElement, index) => {
    const lastPair = data.slice(-1)[0];

    const secondArrayStartIndex = lastPair ? lastPair.secondIndex : 0;

    const pair = secondArray.find((el, index) => {
      return el === currentElement && index >= secondArrayStartIndex;
    });

    if (!pair) {
      return data;
    }

    const pairIndex = secondArray.indexOf(pair);

    data.push({
      firstIndex: index,
      secondIndex: pairIndex,
      value: currentElement
    });

    return data;
  }, []);
};

module.exports = findPairs;