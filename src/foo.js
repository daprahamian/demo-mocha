'use strict';

const add = require('./add').add;

class Foo {
  constructor() {
    this.a = 1;
    this.b = 'hello';
  }

  add(a, b) {
    return add(a, b);
  }

  addArray(arr) {
    return arr.reduce((x, y) => this.add(x, y));
  }

  addArrayAsync(arr, callback) {
    // Copies array;
    arr = arr.concat();

    function addAsync() {
      if (arr.length <= 1) {
        return callback(null, arr[0]);
      }

      const x = arr.pop();
      const y = arr.pop();
      try {
        const result = add(x, y);
        arr.push(result);
      } catch(e) {
        return callback(e);
      }
      setTimeout(addAsync);
    }
    addAsync();
  }

  addArrayWithPromise(arr) {
    return new Promise((resolve, reject) => {
      this.addArrayAsync(arr, (err, result) => err ? reject(err) : resolve(result));
    });
  }
}

module.exports.Foo = Foo;
