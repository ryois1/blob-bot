const { Events } = require('discord.js');
const { EmbedResponse } = require('@src/structures');

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

		const responseData = {
			color: 'ERROR',
			author: { name: `${user.tag} Left`, iconURL: user.displayAvatarURL({ dynamic: true }) },
			thumbnail: user.displayAvatarURL({ dynamic: true }),
			description: `<@${user.id}> ${user.tag}`,
			footer: { text: `ID: ${user.id}` },
		};
		const response = new EmbedResponse(responseData, client);
		await channel.send({ embeds: [response.build()] });
	},
};