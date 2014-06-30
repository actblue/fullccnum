Fullccnum
=========

Use the Luhn algorithm to validate whether a number is a valid credit card number. Also includes helpers to scrub spaces, dashes, and the like.

## Usage

		var Fullccnum = require('./lib/fullccnum');
		var ccNumInput = '4111-1111-1111-1111';
		var cleanCcNum = Fullccnum.scrubNonDigits(ccNumInput);
		if (Fullccnum.isValid(cleanCcNum)) {
			logger.debug('This is a valid credit card!');
		} else {
			logger.debug('This is not a valid credit card.');
		}

## Run the tests

		npm test
