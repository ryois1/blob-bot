module.exports = {
	name: 'dns',
	cooldown: 3,
	usage: '[Command only]',
	aliases: ['itwasdns'],
	description: 'DNS Hell!',
	guildOnly: false,
	enabled: true,
	async execute(message) {
		const Discord = require('discord.js');
		const attachment = new Discord.MessageAttachment('./content/itwasdns.png');
		message.channel.send(attachment);
	},
};
