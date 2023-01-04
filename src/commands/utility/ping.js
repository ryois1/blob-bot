const { Command, EmbedResponse } = require('@src/structures');

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
		// Logic Section
		const pingData = {
			title: 'Pinging...',
		};
		const ping = new EmbedResponse(pingData, interaction.client);
		const sent = await interaction.reply({ embeds: [ping.build()], fetchReply: true });

		// Response Section
		const responseData = {
			title: 'Pong 🏓!',
			fields: [{ name: 'WebSocket Latency', value: `${interaction.client.ws.ping}ms`, inline: true }, { name: 'WebSocket Latency', value: `${sent.createdTimestamp - interaction.createdTimestamp}ms.`, inline: true }],
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.editReply({ embeds: [response.build()] });
	}
};