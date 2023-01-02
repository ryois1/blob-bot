const { Command } = require('@src/structures');

module.exports = class Ping extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			description: 'Replies with pong!',
			globallyEnabled: true,
			category: 'utility',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		// Respond with the time between now and when the user sent their message
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Pong 🏓! WebSocket Latency: ${interaction.client.ws.ping}ms. Round Trip Latency is ${sent.createdTimestamp - interaction.createdTimestamp}ms.`);
	}
};