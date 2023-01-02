// Required Modules
require('module-alias/register');
const path = require('node:path');
const token = process.env.DISCORD_TOKEN;
const { BotClient } = require('@src/structures');

// New Client Instance
const client = new BotClient();

// Register Events and Command
client.loadCommands(path.join(__dirname, 'src/commands'));
client.loadEvents(path.join(__dirname, 'src/events'));

// Login to Discord
client.login(token);