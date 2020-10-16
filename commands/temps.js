module.exports = {
	name: 'temps',
	aliases: ['temp'],
	usage: '<c/f> <temp to convert>',
	description: 'Celsius to Fahrenheit and vice versa',
	async execute(message, args) {
		const unitFrom = args[0];
		const from = args[1];
		if(unitFrom == 'c') {
			const cToFahr = from * 9 / 5 + 32;
			const output = from + '\xB0C is ' + cToFahr.toFixed(2) + ' \xB0F.';
			message.reply(output);
		}
		if(unitFrom == 'C') {
			const cToFahr = from * 9 / 5 + 32;
			const output = from + '\xB0C is ' + cToFahr.toFixed(2) + ' \xB0F.';
			message.reply(output);
		}
		if(unitFrom == 'f') {
			const fToCel = (from - 32) * 5 / 9;
			const output = from + '\xB0F is ' + fToCel.toFixed(2) + '\xB0C.';
			message.reply(output);
		}
		if(unitFrom == 'F') {
			const fToCel = (from - 32) * 5 / 9;
			const output = from + '\xB0F is ' + fToCel.toFixed(2) + '\xB0C.';
			message.reply(output);
		}
	},
};
