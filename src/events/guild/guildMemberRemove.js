const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberRemove,
	async execute(guild, client) {
		const channel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [guild.id], async function(error, result) {
				if (error) client.logger.error(error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const user = await client.users.fetch(guild.user.id);
		const memberRemoveEmbed = new EmbedBuilder()
			.setColor(0xFF470F)
			.setAuthor({ name: `${user.tag} Left`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(`<@${user.id}> ${user.tag}`)
			.setTimestamp()
			.setFooter({ text: `ID: ${user.id}` });
		await channel.send({ embeds: [memberRemoveEmbed] });
	},
};