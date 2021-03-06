'use strict';

/* mapping with a callback
  you might have noticed that these loops strategies are repetitive
  higher order functions will help you write more reusable code
*/

const deepCompare = (actual, expect) => actual === expect || Object.is(actual, expect) || (Object(actual) === actual && Object(expect) === expect) && (Array.isArray(actual) && Array.isArray(expect) && actual.length === expect.length && expect.every((expect, index) => deepCompare(actual[index], expect)));

/**
 * executes the callback with each item of the array
 * fills a new array with the return values
 * does not modify the parameter
 * @param {Array} arr - an array of items to map
 * @param {Function} callback - how to map each item
 * @returns {Array} a new array with the mapped items
 */
const map = (arr, callback) => {
  const mappedEntries = [];
  for (const entry of arr) {
    const mapped = callback(entry);
    mappedEntries.push(mapped);
  }
  return mappedEntries;
};

const argArray = [3, true, 'hi', '', 0];

// Callback to cast to Number
const castToNumber = (val) => Number(val);

const _1_expect = [3, 1, NaN, 0, 0];
const _1_actual = map(argArray, castToNumber);
console.assert(deepCompare(_1_actual, _1_expect), 'Test 1: map to type number');


// Callback that converts to the type
const typeOfValue = (val) => typeof val;

const _2_expect = ['number', 'boolean', 'string', 'string', 'number']
const _2_actual = map(argArray, typeOfValue);
console.assert(deepCompare(_2_actual, _2_expect), 'Test 2: map to the value\'s type');

