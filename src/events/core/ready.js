const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.logger.log(`Ready! Logged in as ${client.user.tag}`);
		client.guilds.cache.forEach(async guild => {
			await client.db.query('INSERT INTO servers (server_id, server_name) VALUES(?,?) ON DUPLICATE KEY UPDATE server_name=?', [guild.id, guild.name, guild.name]);
			client.logger.log(`Found Guild: "${guild.name}" | ${guild.id}`);
		});
	},
};