'use strict';

// a good way to test for side effects is to test the argument afterwards
//  if the test passes twice, then the original array wasn't modified

const deepCompareArrays = (actual, expect) => actual === expect || Object.is(actual, expect) || (Object(actual) === actual && Object(expect) === expect) && (Array.isArray(actual) && Array.isArray(expect) && actual.length === expect.length && expect.every((expect, index) => deepCompareArrays(actual[index], expect)));



const noSideEffect = (oldArray, index, newValue) => {
  const newArray = [];
  for (let item of oldArray) {
    newArray.push(item);
  }
  newArray[index] = newValue;
  return newArray;
};

const arg1 = ['table', 'chair', 'sofa'];

// run the test once
const returned1 = noSideEffect(arg1, 1, '');
console.assert(returned1[1] === '', 'Test 1');

// this will pass because the argument was not modified
const argWasNotModified1 = deepCompareArrays(arg1, ['table', 'chair', 'sofa']);
console.assert(argWasNotModified1, 'arg1 was not modified');



const yesSideEffect = (array, index, newValue) => {
  array[index] = newValue;
  return array;
};


const arg2 = ['table', 'chair', 'sofa'];

// run the test once
const returned2 = yesSideEffect(arg2, 1, '');
console.assert(returned2[1] === '', 'Test 2');

// this will fail because the argument was modified
const argWasNotModified2 = deepCompareArrays(arg2, ['table', 'chair', 'sofa']);
console.assert(argWasNotModified2, 'arg2 was not modified');
