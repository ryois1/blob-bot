module.exports = {
	name: 'ctof',
	cooldown: 3,
	usage: '<temp to convert>',
	description: 'Celsius to Fahrenheit',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t provide any arguments!');
		}
		const from = args[0];
		if(isNaN(from)) {
			return message.reply('That is not a number');
		}
		const cToFahr = from * 9 / 5 + 32;
		const output = from + '\xB0C is ' + cToFahr.toFixed(2) + ' \xB0F.';
		message.reply(output);
	},
};
