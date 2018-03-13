const compare = require('../lib/compareFiles/compare');

const { TYPE_ADDED, TYPE_DELETED, TYPE_CHANGED, TYPE_PAIR } = require('../lib/compareFiles/constants');

test('If files are empty it returns no difference', () => {
  const array1 = [];
  const array2 = [];

  const result = compare(array1, array2);

  expect(result).toEqual([]);
});

test('Test value changed to sample value', () => {
  const array1 = ['Test'];
  const array2 = ['Sample'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'Sample'}
  ]);
});

test('Test is deleted', () => {
  const array1 = ['Test'];
  const array2 = [];

  const result = compare(array1, array2);

  expect(result).toEqual([{ type: TYPE_DELETED, value: 'Test'}]);
});

test('Simple is deleted and one pair exists', () => {
  const array1 = ['Simple', 'Text'];
  const array2 = ['Text'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_DELETED, value: 'Simple' },
    { type: TYPE_PAIR, value: 'Text', firstIndex: 1, secondIndex: 0 }
  ]);
});

test('Some changed to Another, Simple is deleted, and two pairs exist', () => {
  const array1 = ['Some', 'Simple', 'Text', 'File'];
  const array2 = ['Another', 'Text', 'File'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_CHANGED, firstValue: 'Some', secondValue: 'Another'},
    { type: TYPE_DELETED, value: 'Simple'},
    { type: TYPE_PAIR, value: 'Text', firstIndex: 2, secondIndex: 1 },
    { type: TYPE_PAIR, value: 'File', firstIndex: 3, secondIndex: 2 }
  ]);
});

test('3 value added', () => {
  const array1 = [];
  const array2 = ['Another', 'Text', 'File'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_ADDED, value: 'Another' },
    { type: TYPE_ADDED, value: 'Text' },
    { type: TYPE_ADDED, value: 'File' }
  ]);
});

test(`Some changed to Another, Simple is deleted, 
  Text and File have duplicates and 3 value added`, () => {
  const array1 = ['Some', 'Simple', 'Text', 'File'];
  const array2 = ['Another', 'Text', 'File', 'With', 'Additional', 'Lines'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_CHANGED, firstValue: 'Some', secondValue: 'Another'},
    { type: TYPE_DELETED, value: 'Simple'},
    { type: TYPE_PAIR, value: 'Text', firstIndex: 2, secondIndex: 1 },
    { type: TYPE_PAIR, value: 'File', firstIndex: 3, secondIndex: 2 },
    { type: TYPE_ADDED, value: 'With' },
    { type: TYPE_ADDED, value: 'Additional' },
    { type: TYPE_ADDED, value: 'Lines' }
  ]);
});