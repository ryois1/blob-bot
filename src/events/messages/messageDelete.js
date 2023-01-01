const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageDelete,
	async execute(message, client) {
		const channel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [message.guild.id], async function(error, result) {
				if (error) console.error (error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const user = await client.users.fetch(message.author.id);
		const deleteEmbed = new EmbedBuilder()
			.setColor(0xFF470F)
			.setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`**Message sent by <@${user.id}> Deleted in <#${message.channelId}>**\n${message.content}`)
			.setTimestamp()
			.setFooter({ text: `Author: ${user.id} | Message ID: ${message.id}` });
		await channel.send({ embeds: [deleteEmbed] });
	},
};