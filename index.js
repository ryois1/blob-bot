require('module-alias/register');
const fs = require('node:fs');
const path = require('node:path');
const config = process.env;
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const token = config.DISCORD_TOKEN;
const database = require('@src/database')(config);

// Bot Client Instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
client.db = database;

// Get Events files
const eventsPath = path.join(__dirname, 'src/events');
const eventsFolders = fs.readdirSync(eventsPath);

for (const folder of eventsFolders) {
	const files = fs.readdirSync(`${eventsPath}/${folder}`);
	for (const file of files) {
		const event = require(`${eventsPath}/${folder}/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	}
}
// Initalize Command Collection
client.commands = new Collection();

// Get Commands files
const commandsPath = path.join(__dirname, 'src/commands');
const commandsFolders = fs.readdirSync(commandsPath);

for (const folder of commandsFolders) {
	const files = fs.readdirSync(`${commandsPath}/${folder}`);
	for (const file of files) {
		const command = require(`${commandsPath}/${folder}/${file}`);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
	}
}
// Log in to Discord with your client's token
client.login(token);