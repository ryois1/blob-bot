module.exports = {
	name: 'fuckoff',
	cooldown: 3,
	usage: '[Command only]',
	aliases: ['foaas'],
	description: 'FOaaS',
	guildOnly: false,
	async execute(message) {
		const Discord = require('discord.js');
		const attachment = new Discord.MessageAttachment('./content/fuckoff.gif');
		message.channel.send(`${message.author},`, attachment);
	},
};
