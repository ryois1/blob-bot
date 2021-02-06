module.exports = {
	name: 'ftok',
	cooldown: 3,
	usage: '<temp to convert>',
	description: 'Fahrenheit to Kelvin',
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
		const ftoK = (from * 1.8) + 32;
		const output = from + '\xB0F is ' + ftoK.toFixed(2) + ' K.';
		message.reply(output);
	},
};
