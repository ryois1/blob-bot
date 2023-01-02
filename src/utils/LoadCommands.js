const { Collection } = require('discord.js');
const fs = require('node:fs');

module.exports = async (directory, client) => {
	client.commands = new Collection();
	const commandsFolders = fs.readdirSync(directory);
	for (const folder of commandsFolders) {
		const files = fs.readdirSync(`${directory}/${folder}`);
		for (const file of files) {
			const command = require(`${directory}/${folder}/${file}`);
			if ('data' in command && 'execute' in command) {
				client.logger.log(`Loaded command "${command.data.name}"`);
				client.commands.set(command.data.name, command);
			}
		}
	}
};