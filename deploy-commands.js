const { REST, Routes } = require('discord.js');
const config = process.env;
const token = config.DISCORD_TOKEN;
const clientId = config.DISCORD_CLIENT_ID;
const path = require('node:path');
const fs = require('node:fs');

const commands = [];


const commandsPath = path.join(__dirname, 'src/commands');
const commandsFolders = fs.readdirSync(commandsPath);

for (const folder of commandsFolders) {
	const files = fs.readdirSync(`${commandsPath}/${folder}`);
	for (const file of files) {
		const command = require(`${commandsPath}/${folder}/${file}`);
		commands.push(command.data.toJSON());
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();