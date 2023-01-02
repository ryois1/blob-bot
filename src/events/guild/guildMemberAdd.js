const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(guild, client) {
		const channel = await new Promise((resolve) => {
			client.db.query('SELECT setting_value FROM server_settings WHERE server_id = ? AND setting_name = \'action_log_channel_id\' LIMIT 1', [guild.id], async function(error, result) {
				if (error) client.logger.error(error);
				if (result.length) resolve(client.channels.cache.get(result[0].setting_value));
			});
		});
		const user = await client.users.fetch(guild.user.id);
		const createdDate = user.createdAt;
		const createdString = (createdDate.getMonth() + 1) + '/' + createdDate.getDate() + '/' + createdDate.getFullYear();
		const memberAddEmbed = new EmbedBuilder()
			.setColor(0x43B582)
			.setAuthor({ name: `${user.tag} Joined`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(`<@${user.id}> ${user.tag}`)
			.addFields(
				{ name: 'Created On', value: createdString })
			.setTimestamp()
			.setFooter({ text: `ID: ${user.id}` });
		await channel.send({ embeds: [memberAddEmbed] });
	},
};
