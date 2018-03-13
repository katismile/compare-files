'use strict';

const compare = require('./lib/compare');

const array1 = ['Some', 'Simple', 'Text', 'File'];
const array2 = ['Another', 'Text', 'File', 'With', 'Additional', 'Lines'];

const result = compare(array1, array2);

console.log('------>', result);