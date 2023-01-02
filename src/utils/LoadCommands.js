const { Collection } = require('discord.js');
const fs = require('node:fs');

module.exports = async (directory, client) => {
	client.commands = new Collection();
	const commandsFolders = fs.readdirSync(directory);
	for (const folder of commandsFolders) {
		const files = fs.readdirSync(`${directory}/${folder}`);
		for (const file of files) {
			const command = require(`${directory}/${folder}/${file}`);
			const cmd = new command(client);
			if (cmd.slashCommand?.enabled) {
				client.logger.log(`Loaded command "${cmd.name}"`);
				client.commands.set(cmd.name, cmd);
			}
		}
	}
};