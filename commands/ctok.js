module.exports = {
	name: 'ctok',
	cooldown: 3,
	usage: '<temp to convert>',
	description: 'Celsius to Kelvin',
	guildOnly: false,
	enabled: true,
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t provide any arguments!');
		}
		const from = Number(args[0]);
		if(isNaN(from)) {
			return message.reply('That is not a number');
		}
		const ctoK = from + 273.15;
		const output = from + '\xB0C is ' + ctoK.toFixed(2) + ' K.';
		message.reply(output);
	},
};
