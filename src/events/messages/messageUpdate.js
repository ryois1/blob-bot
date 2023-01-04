const { Events } = require('discord.js');
const { EmbedResponse } = require('@src/structures');

module.exports = {
	name: Events.MessageUpdate,
	async execute(oldMessage, newMessage, client) {
		if (oldMessage.partial) return;
		if (oldMessage.author.bot || !oldMessage.guild) return;
		if (oldMessage.embeds.length > 0) {
			return;
		}

		const channel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [oldMessage.guild.id], async function(error, result) {
				if (error) client.logger.error(error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const user = await client.users.fetch(oldMessage.author.id);

		const responseData = {
			color: 'WARNING',
			author: { name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) },
			fields: [{ name: 'Before', value: oldMessage.content }, { name: 'After', value: newMessage.content }],
			description: `**Message edited in <#${oldMessage.channelId}>** [Jump to Message](${newMessage.url})`,
			footer: { text: `Author: ${user.id} | Message ID: ${oldMessage.id}` },
		};
		const response = new EmbedResponse(responseData, client);

		try {
			await channel.send({ embeds: [response.build()] });
		}
		catch (err) {
			client.logger.error(err);
		}
	},
};