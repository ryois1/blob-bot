// Required Modules
require('module-alias/register');
const path = require('node:path');
const config = require('@root/config');
const token = process.env.DISCORD_TOKEN;
const { Client, GatewayIntentBits } = require('discord.js');
const { LoadCommands, LoadEvents } = require('@src/utils');
const logger = require('@src/helpers/logger');

// New Client Instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
const database = require('@src/helpers/database')(process.env, client);

// Give Client Instance Database
client.db = database;
client.logger = logger;
client.config = config;
// Register Events and Command
const eventsPath = path.join(__dirname, 'src/events');
const commandsPath = path.join(__dirname, 'src/commands');
LoadEvents(eventsPath, client);
LoadCommands(commandsPath, client);

// Login to Discord
client.login(token);