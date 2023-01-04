const { Events } = require('discord.js');
const { EmbedResponse } = require('@src/structures');

module.exports = {
	name: Events.MessageBulkDelete,
	async execute(messages, channel, client) {
		const targetChannel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [channel.guild.id], async function(error, result) {
				if (error) client.logger.error(error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const responseData = {
			color: 'ERROR',
			author: { name: `${channel.guild.name}`, iconURL: channel.guild.iconURL({ dynamic: true }) },
			description: `**Bulk delete in <#${channel.id}>, ${messages.size} messages deleted**`,
		};
		const response = new EmbedResponse(responseData, client);
		await targetChannel.send({ embeds: [response.build()] });
	},
};