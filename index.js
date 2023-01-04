// Required Modules
require('module-alias/register');
const path = require('node:path');
const token = process.env.DISCORD_TOKEN;
const { BotClient, StartupChecker } = require('@src/structures');

// Start the program
// New Client Instance
const client = new BotClient();
const startupChecker = new StartupChecker(require('@root/config'), require('@src/helpers/database')(process.env, client));
try {
	startupChecker.checkConfig();
	startupChecker.checkDatabaseConnection();
}
catch (error) {
	console.error(error.message);
	process.exit(1);
}
finally {
	console.log('Startup config is good!');
}
// Register Events and Command
client.loadCommands(path.join(__dirname, 'src/commands'));
client.loadEvents(path.join(__dirname, 'src/events'));

// Login to Discord
client.login(token);