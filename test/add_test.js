'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const add = require('../src/add').add;

describe('Add tests', function() {
  it('should add two numbers together (assert)', function() {
    assert.equal(add(1, 2), 3);
  });

  it('should add two numbers together (chai)', function() {
    expect(add(1, 2)).to.be.a('number').and.to.equal(3);
  });

  it('should throw if either argument is not a number', function() {
    expect(() => add()).to.throw(TypeError);
    expect(() => add(1)).to.throw(TypeError);
    expect(() => add('hello', 2)).to.throw(TypeError);
    expect(() => add(1, 2)).to.not.throw(TypeError);
  });
});
