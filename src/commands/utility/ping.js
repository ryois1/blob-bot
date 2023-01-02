const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: false,
	category: 'utility',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Pong 🏓! WebSocket Latency: ${interaction.client.ws.ping}ms. Round Trip Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`);
	},
};