const responses = [
	'it is certain',
	'it is decidedly so',
	'without a doubt',
	'yes — definitely',
	'you may rely on it',
	'as I see it, yes',
	'most likely',
	'outlook good',
	'yes',
	'signs point to yes',
	'reply hazy, try again',
	'ask again later',
	'better not tell you now',
	'cannot predict now',
	'concentrate and ask again',
	'don\'t count on it',
	'my reply is no',
	'my sources say no',
	'outlook not so good',
	'very doubtful',
];

module.exports = () => responses[Math.floor(responses.length * Math.random())];

// Code from https://www.npmjs.com/package/8ball