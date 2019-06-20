'use strict';

function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('Both Arguments must be numbers');
  }
  
  return x + y;
}

module.exports.add = add;
