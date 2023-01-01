const { Events, EmbedBuilder } = require('discord.js');
module.exports = {
	name: Events.MessageBulkDelete,
	async execute(messages, channel, client) {
		const targetChannel = client.channels.cache.get('765594416366747658');
		const deleteEmbed = new EmbedBuilder()
			.setColor(0xFF470F)
			.setAuthor({ name: `${channel.guild.name}`, iconURL: channel.guild.iconURL({ dynamic: true }) })
			.setDescription(`**Bulk delete in <#${channel.id}>, ${messages.size} messages deleted**`)
			.setTimestamp();
		await targetChannel.send({ embeds: [deleteEmbed] });
	},
};