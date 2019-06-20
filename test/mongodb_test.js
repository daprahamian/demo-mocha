'use strict';

const MongoClient = require('mongodb').MongoClient;

describe('MongoDB tests', function () {
  describe.skip('leaking version', function() {
    it('should be able to insert a document (callback API)', function(done) {
      const client = new MongoClient('mongodb://localhost:27017');
      client.connect(err => {
        expect(err).to.not.exist;
        client.db('foo').collection('bar').insertOne({ a: 1 }, (err, result) => {
          expect(err).to.not.exist;
          client.close();
          done();
        });
      });
    });
  });

  describe.skip('better version', function() {
    it('should be able to insert a document (callback API)', function(done) {
      const client = new MongoClient('mongodb://localhost:27017');
      client.connect(err => {
        expect(err).to.not.exist;
        client.db('foo').collection('bar').insertOne({ a: 1 }, (err, result) => {
          expect(err).to.not.exist;
          client.close(done);
        });
      });
    });
  });

  describe.skip('even better version', function() {
    it('should be able to insert a document (callback API)', function(done) {
      const client = new MongoClient('mongodb://localhost:27017');
  
      function finish(err) {
        client.close(_err => done(err || _err));
      }
  
      client.connect(err => {
        try {
          expect(err).to.not.exist;
        } catch (e) {
          return finish(e);
        }
  
        client.db('foo').collection('bar').insertOne({ a: 1 }, err => {
          try {
            expect(err).to.not.exist;
            finish();
          } catch (e) {
            finish(e);
          }
        });
      });
    });
  });

  describe.skip('best version', function() {
    let client;
    beforeEach(function(done) {
      client = new MongoClient('mongodb://localhost:27017');
      client.connect(done);
    });

    afterEach(function(done) {
      client.close(done);
    });

    it('should be able to insert a document (callback API)', function(done) {
      client.db('foo').collection('bar').insertOne({ a: 1 }, (err, result) => {
        try {
          expect(err).to.not.exist;
          done();
        } catch(e) {
          done(e);
        }
      });
    });
  });
});