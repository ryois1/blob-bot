const { Events } = require('discord.js');
const { EmbedResponse } = require('@src/structures');

module.exports = {
	name: Events.MessageDelete,
	async execute(message, client) {
		if (message.partial) return;
		if (message.author.bot || !message.guild) return;
		const channel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [message.guild.id], async function(error, result) {
				if (error) client.logger.error(error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const user = await client.users.fetch(message.author.id);
		const responseData = {
			color: 'ERROR',
			author: { name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) },
			description: `**Message sent by <@${user.id}> Deleted in <#${message.channelId}>**\n${message.content}`,
			footer: { text: `Author: ${user.id} | Message ID: ${message.id}` },
		};
		const response = new EmbedResponse(responseData, client);
		await channel.send({ embeds: [response.build()] });
	},
};