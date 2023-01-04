const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.logger.success(`Ready! Logged in as ${client.user.tag}`);
		client.logger.log('Finding guilds I am in...');
		client.guilds.cache.forEach(async guild => {
			await client.db.query('INSERT INTO servers (server_id, server_name) VALUES(?,?) ON DUPLICATE KEY UPDATE server_name=?', [guild.id, guild.name, guild.name]);
			client.logger.success(`Found Guild: "${guild.name}" | ${guild.id}`);
		});
	},
};