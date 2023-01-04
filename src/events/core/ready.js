const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.logger.success(`Ready! Logged in as ${client.user.tag}`);
		client.logger.log('Finding guilds I am in...');
		client.guilds.cache.forEach(async guild => {
			await client.db.query('INSERT INTO guilds (guild_id, guild_name) VALUES(?,?) ON DUPLICATE KEY UPDATE guild_name=?', [guild.id, guild.name, guild.name]);
			client.logger.success(`Found Guild: "${guild.name}" | ${guild.id}`);
		});
	},
};