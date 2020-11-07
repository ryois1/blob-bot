module.exports = {
	name: '8ball',
	usage: '[Command only]',
	cooldown: 3,
	aliases: ['ball'],
	description: 'Magic 8 Ball!',
	guildOnly: false,
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t give me a question');
		}
		const eightball = require('8ball')();
		message.reply(`*${args.splice(0).join(' ')}?* ... ${eightball}`);
	},
};