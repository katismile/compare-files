'use strict';

/**
 * Find pairs of non changed values which are close to each other
 *
 * @param {Array} firstArray
 * @param {Array} secondArray
 *
 * @return {Array}
 */

const findClosestPairs = (firstArray, secondArray) => {
  const result = firstArray.reduce((data, currentElement, index) => {
    const lastPair = data.pairs.length > 1 ? data.pairs.slice(-1)[0] : null;

    const pairIndexes = secondArray.reduce((pairIndexes, el, index) => {
      const usedIndex = data.addedPairsIndexes.find(el => el === index);

      if (lastPair && lastPair.secondIndex > index) {
        return pairIndexes;
      }
      if (el !== currentElement || usedIndex || (lastPair && lastPair.secondIndex > index)) {
        return pairIndexes;
      }

      pairIndexes.push(index);

      return pairIndexes;
    }, []);


    if (!pairIndexes.length) {
      return data;
    }

    const closestPairIndex = findClosestIndex(pairIndexes, index);

    data.pairs.push({
      value: currentElement,
      firstIndex: index,
      secondIndex: closestPairIndex
    });

    data.addedPairsIndexes.push(closestPairIndex);

    return data;
  }, { pairs: [], addedPairsIndexes: []});

  if (result.addedPairsIndexes[0] > result.addedPairsIndexes[1]) {
    return result.pairs.slice(1);
  }

  return result.pairs;
};

function findClosestIndex(indexes, currentIndex) {
  const data = indexes.reduce((result, index) => {
    const deviation = Math.abs(currentIndex - index);
    if (!result.mixIndexDeviation || result.mixIndexDeviation >= deviation) {
      result.mixIndexDeviation = deviation;
      result.index = index;
    }

    return result;
  }, {
    mixIndexDeviation: null,
    index: null
  });
  return data.index;
}

module.exports = findClosestPairs;