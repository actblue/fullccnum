/*global module, require */

var _ = require('underscore');


var Fullccnum = function() {};

Fullccnum.scrubNonDigits = function (raw) {
  var scrubbed = raw;
  if (typeof scrubbed === 'number') {
    scrubbed = scrubbed.toString();
  }
  if (typeof scrubbed === 'string') {
    scrubbed = scrubbed.replace(/[^\d]/g, '');
  }
  return scrubbed;
};

Fullccnum.isValid = function(ccnum) {
  return (ccnum &&
    typeof ccnum === 'string' &&
    !!ccnum.match(/^\d{13,16}$/) &&   // Only 13-16 digits
    Fullccnum.passesLuhnCode(ccnum));
};

/**
 * Validates that the number passes the Luhn algorithm.
 *
 * An explanation of the Luhn algorithm can be found on Wikipedia:
 * http://en.wikipedia.org/wiki/Luhn_algorithm
 * An online validator can be found here:
 * http://www.ee.unb.ca/cgi-bin/tervo/luhn.pl
 */
Fullccnum.passesLuhnCode = function(ccnum) {
  var digits = ccnum.split('').reverse(),
      oddDigits = _.values(_.pick(digits, _.range(0, digits.length, 2))),
      evenDigits = _.values(_.pick(digits, _.range(1, digits.length, 2))),
      checksum = 0;

  checksum += _.reduce(
    oddDigits,
    function(memo, num) {
      return memo + (+num);
    },
    0
  );
  checksum += _.reduce(
    evenDigits,
    function(memo, num) {
      return memo + condenseToSingleDigit(2 * (+num));
    },
    0
  );

  return (checksum % 10 === 0);
};

module.exports = Fullccnum;


function condenseToSingleDigit(number) {
  if (number < 10) {
    return number;
  }

  var sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return condenseToSingleDigit(sum);
}
