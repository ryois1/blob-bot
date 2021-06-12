module.exports = {
	name: '8ball',
	usage: '[Command only]',
	cooldown: 3,
	aliases: ['ball'],
	description: 'Magic 8 Ball!',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message, args) {
		const eightball = require('8ball')();
		if (!args.length) {
			return message.reply('you didn\'t give me a question');
		}
		message.reply(`*${args.splice(0).join(' ')}?* ... ${eightball}`);
	},
};