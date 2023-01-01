const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageUpdate,
	async execute(oldMessage, newMessage, client) {
		const channel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [oldMessage.guild.id], async function(error, result) {
				if (error) console.error (error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const user = await client.users.fetch(oldMessage.author.id);
		const updateEmbed = new EmbedBuilder()
			.setColor(0x337FD5)
			.setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**Message edited in <#${oldMessage.channelId}>** [Jump to Message](${newMessage.url})`)
			.addFields(
				{ name: 'Before', value: oldMessage.content },
				{ name: 'After', value: newMessage.content })
			.setTimestamp()
			.setFooter({ text: `Author: ${user.id} | Message ID: ${oldMessage.id}` });
		await channel.send({ embeds: [updateEmbed] });
	},
};