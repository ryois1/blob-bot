module.exports = {
	name: 'ftoc',
	cooldown: 3,
	usage: '<temp to convert>',
	description: 'Fahrenheit to Celsius',
	guildOnly: false,
	enabled: true,
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t provide any arguments!');
		}
		const from = args[0];
		if(isNaN(from)) {
			return message.reply('That is not a number');
		}
		const fToCel = (from - 32) * 5 / 9;
		const output = from + '\xB0F is ' + fToCel.toFixed(2) + ' \xB0C.';
		message.reply(output);
	},
};
