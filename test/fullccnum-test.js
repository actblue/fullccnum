/*global require, describe, it */

require('./helper');

var should = require('should'),
    Fullccnum = require('../lib/fullccnum');

describe('Fullccnum', function() {

  describe('scrubNonDigits', function() {
    describe('given an empty input', function() {
      it('should return the same empty input', function() {
        should.not.exist(Fullccnum.scrubNonDigits());   // Returned null
        should.not.exist(Fullccnum.scrubNonDigits(null));   // Returned null
        Fullccnum.scrubNonDigits('').should.eql('');
      });
    });

    describe('given an input of only digits', function() {
      it('should return the input string', function() {
        Fullccnum.scrubNonDigits('123456789').should.eql('123456789');
      });
    });

    describe('given an input with only non-digits', function() {
      it('should return an empty string', function() {
        Fullccnum.scrubNonDigits('Ab,. !@#$<>-_').should.eql('');
      });
    });

    describe('given an input of digits and other characters', function() {
      it('should return a string of only the digits', function() {
        Fullccnum.scrubNonDigits('!12A3&4 567-8a9').should.eql('123456789');
      });
    });
  });

  describe('validate', function() {
    describe('length', function() {
      describe('a valid 16-digit number', function() {
        it('should return true', function() {
          Fullccnum.isValid('4111111111111111').should.be.true;
        });
      });

      describe('a valid 15-digit AmEx number', function() {
        it('should return true', function() {
          Fullccnum.isValid('348771682068975').should.be.true;
        });
      });

      describe('checking lower limit', function() {
        it('should verify at least 13 digits', function() {
          Fullccnum.isValid('111111111212').should.be.false;
          Fullccnum.isValid('1111111111112').should.be.true;
        });
      });

      describe('checking the upper limit', function() {
        it('should verify no more than 16 digits', function() {
          Fullccnum.isValid('4111111111111111').should.be.true;
          Fullccnum.isValid('41111111111111121').should.be.false;
        });
      });
    });

    describe('only digits', function() {
      it('should verify that the number contains only digits', function() {
        Fullccnum.isValid('348771682068975').should.be.true;
        Fullccnum.isValid('348771682068975a').should.be.false;
        Fullccnum.isValid('34877-1682068975').should.be.false;
        Fullccnum.isValid('34877 1682068975').should.be.false;
      });
    });

    describe('Luhn', function() {
      it('should run the number through the Luhn algorithm', function() {
        Fullccnum.isValid('4111111111111111').should.be.true;
        Fullccnum.isValid('4111111111111121').should.be.false;
        Fullccnum.isValid('4111111111111211').should.be.false;
        Fullccnum.isValid('4111111111112111').should.be.false;
        Fullccnum.isValid('4111111111121111').should.be.false;
        Fullccnum.isValid('4111111111211111').should.be.false;
        Fullccnum.isValid('4111111112111111').should.be.false;
        Fullccnum.isValid('4111111121111111').should.be.false;
        Fullccnum.isValid('4111111211111111').should.be.false;
        Fullccnum.isValid('4111112111111111').should.be.false;
        Fullccnum.isValid('4111121111111111').should.be.false;
        Fullccnum.isValid('4111211111111111').should.be.false;
        Fullccnum.isValid('4112111111111111').should.be.false;
        Fullccnum.isValid('4121111111111111').should.be.false;
        Fullccnum.isValid('4211111111111111').should.be.false;
        Fullccnum.isValid('5111111111111111').should.be.false;
      });
    });
  });

});
