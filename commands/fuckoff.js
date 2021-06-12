module.exports = {
	name: 'fuckoff',
	cooldown: 3,
	usage: '[Command only]',
	aliases: ['foaas'],
	description: 'FOaaS',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message) {
		const Discord = require('discord.js');
		const attachment = new Discord.MessageAttachment('./content/fuckoff.gif');
		message.channel.send(`${message.author},`, attachment);
	},
};
