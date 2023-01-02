const { Client, Collection, GatewayIntentBits } = require('discord.js');
const logger = require('@src/helpers/logger');
const fs = require('fs');

module.exports = class BotClient extends Client {
	constructor() {
		super({
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
		});

		this.config = require('@root/config');

		/**
         * @type {Collection<string, Command>}
         */
		this.commands = [];

		// Logger
		this.logger = logger;

		// Database
		this.db = require('@src/helpers/database')(process.env, this);
	}
	async loadCommands(directory) {
		this.commands = new Collection();
		const commandsFolders = fs.readdirSync(directory);
		for (const folder of commandsFolders) {
			const files = fs.readdirSync(`${directory}/${folder}`);
			for (const file of files) {
				const command = require(`${directory}/${folder}/${file}`);
				const cmd = new command(this);
				if (cmd.slashCommand?.enabled) {
					this.logger.log(`Loaded command "${cmd.name}"`);
					this.commands.set(cmd.name, cmd);
				}
			}
		}
	}

	async loadEvents(directory) {
		const eventsFolders = fs.readdirSync(directory);
		for (const folder of eventsFolders) {
			const files = fs.readdirSync(`${directory}/${folder}`);
			for (const file of files) {
				const event = require(`${directory}/${folder}/${file}`);
				if (event.once) {
					this.logger.log(`Loaded one time event "${event.name}"`);
					this.once(event.name, (...args) => event.execute(...args, this));
				}
				else {
					this.logger.log(`Loaded event "${event.name}"`);
					this.on(event.name, (...args) => event.execute(...args, this));
				}
			}
		}
	}
};