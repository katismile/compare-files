const compare = require('../../lib/compare-words/compare-arrays');

const { TYPE_ADDED, TYPE_DELETED, TYPE_CHANGED, TYPE_PAIR } = require('../../lib/compare-words/constants');

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

test('Text is added', () => {
  const array1 = [];
  const array2 = ['Text'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_ADDED, value: 'Text' }
  ]);
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

test(`Some changed to Another, Simple and Test are deleted,
  Text and File have duplicates, 3 Test values changed to another values, and last test is deleted`, () => {
  const array1 = ['Some', 'Simple',  'Test', 'Text', 'File', 'Test', 'Test', 'Test', 'Test'];
  const array2 = ['Another', 'Text', 'File', 'With', 'Additional', 'Lines'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_CHANGED, firstValue: 'Some', secondValue: 'Another'},
    { type: TYPE_DELETED, value: 'Simple'},
    { type: TYPE_DELETED, value: 'Test'},
    { type: TYPE_PAIR, value: 'Text', firstIndex: 3, secondIndex: 1 },
    { type: TYPE_PAIR, value: 'File', firstIndex: 4, secondIndex: 2 },
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'With'},
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'Additional'},
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'Lines'},
    { type: TYPE_DELETED, value: 'Test'},
  ]);
});

test(`Some changed to Another, Simple is deleted,
  Text and File have duplicates and 3 Test values are changed and last one is deleted`, () => {
  const array1 = ['Some', 'Text', 'File', 'Test', 'Test', 'Test', 'Test'];
  const array2 = ['Another', 'Simple',  'Test', 'Text', 'File', 'With', 'Additional', 'Lines'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_CHANGED, firstValue: 'Some', secondValue: 'Another'},
    { type: TYPE_ADDED, value: 'Simple'},
    { type: TYPE_ADDED, value: 'Test'},
    { type: TYPE_PAIR, value: 'Text', firstIndex: 1, secondIndex: 3 },
    { type: TYPE_PAIR, value: 'File', firstIndex: 2, secondIndex: 4 },
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'With'},
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'Additional'},
    { type: TYPE_CHANGED, firstValue: 'Test', secondValue: 'Lines'},
    { type: TYPE_DELETED, value: 'Test'},
  ]);
});

test(`Arrays\' langthes are the same and all values different`, () => {
  const array1 = ['1', '2', '3', '4'];
  const array2 = ['5', '6', '7', '8'];

  const result = compare(array1, array2);

  expect(result).toEqual([
    { type: TYPE_CHANGED, firstValue: '1', secondValue: '5'},
    { type: TYPE_CHANGED, firstValue: '2', secondValue: '6'},
    { type: TYPE_CHANGED, firstValue: '3', secondValue: '7'},
    { type: TYPE_CHANGED, firstValue: '4', secondValue: '8'}
  ]);
});