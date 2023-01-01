const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageBulkDelete,
	async execute(messages, channel, client) {
		const targetChannel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [channel.guild.id], async function(error, result) {
				if (error) console.log (error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const deleteEmbed = new EmbedBuilder()
			.setColor(0xFF470F)
			.setAuthor({ name: `${channel.guild.name}`, iconURL: channel.guild.iconURL({ dynamic: true }) })
			.setDescription(`**Bulk delete in <#${channel.id}>, ${messages.size} messages deleted**`)
			.setTimestamp();
		await targetChannel.send({ embeds: [deleteEmbed] });
	},
};