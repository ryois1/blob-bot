const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageUpdate,
	async execute(oldMessage, newMessage, client) {
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
		const updateEmbed = new EmbedBuilder()
			.setColor(client.config.EMBED_COLORS.WARNING)
			.setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**Message edited in <#${oldMessage.channelId}>** [Jump to Message](${newMessage.url})`)
			.addFields(
				{ name: 'Before', value: oldMessage.content },
				{ name: 'After', value: newMessage.content })
			.setTimestamp()
			.setFooter({ text: `Author: ${user.id} | Message ID: ${oldMessage.id}` });
		try {
			await channel.send({ embeds: [updateEmbed] });
		}
		catch (err) {
			client.logger.error(err);
		}
	},
};