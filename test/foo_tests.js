'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const Foo = require('../src/foo').Foo;

describe('Foo', function() {
  describe('.addArray', function () {
    it('should add all the values in an array', function() {
      const foo = new Foo();
      const result = foo.addArray([1, 2, 3, 4, 5, 6]);
      expect(foo.addArray([1, 2, 3, 4, 5, 6])).to.be.a('number').and.to.equal(21);
    });
  
    it('should throw if any value is not a number', function() {
      const foo = new Foo();
      expect(() => foo.addArray([1, 2, 3, '4', 5, 6])).to.throw(TypeError);
    });
  });

  describe('.addArrayAsync', function() {
    it('should add all the values in an array asynchronously', function(done) {
      const foo = new Foo();
  
      foo.addArrayAsync([1, 2, 3, 4, 5, 6], (err, result) => {
        try {
          expect(err).to.not.exist;
          expect(result).to.equal(21);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  
    it('should error if any value is not a number', function(done) {
      const foo = new Foo();
  
      foo.addArrayAsync([1, 2, 3, '4', 5, 6], err => {
        expect(err).to.be.an.instanceOf(TypeError);
        done();
      });
    });
  });

  describe('.addArrayWithPromise', function() {
    it('should add all the values in an array and return a promise', function() {
      const foo = new Foo();
      return foo.addArrayWithPromise([1, 2, 3, 4, 5, 6]).then(result => {
        expect(result).to.equal(21);
      });
    });
  
    it('should reject if any value is not a number', function() {
      const foo = new Foo();
      return foo.addArrayWithPromise([1, 2, 3, '4', 5, 6]).then(
        () => {
          throw new Error('Expected foo.addArray to error')
        },
        err => {
          expect(err).to.be.an.instanceOf(TypeError);
        }
      )
    });
  });

  it.skip('this test is not ready yet', function() {
    expect(1).to.equal(2);
  });

  it('this test is also not ready');

  describe('stubbing', function() {
    let sandbox;
    before(function() {
      sandbox = sinon.createSandbox();
    });
  
    afterEach(function() {
      sandbox.restore();
    });

    it('should call Foo.prototype.add when calling addArray', function() {
      const foo = new Foo();
      sandbox.spy(foo, 'add');

      foo.addArray([1, 2, 3, 4, 5]);

      expect(foo.add).to.have.been.called.with.callCount(4);
    });

    it('should not call Foo.prototype.add when calling addArrayAsync', function(done) {
      const foo = new Foo();
      sandbox.spy(foo, 'add');

      foo.addArrayAsync([1, 2, 3, 4, 5], () => {
        expect(foo.add).to.not.have.been.called;
        done();
      });
    });
  });
});
