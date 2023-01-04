// Required Modules
require('module-alias/register');
const logger = require('@src/helpers/logger');
const path = require('path');
const token = process.env.DISCORD_TOKEN;
const { BotClient, StartupChecker } = require('@src/structures');

// Start the program
// New Client Instance
const client = new BotClient();
const startupChecker = new StartupChecker(require('@root/config'), require('@src/helpers/database')(process.env, client));

(async () => {
	try {
		await startupChecker.checkConfig();
		await startupChecker.checkDatabaseConnection();
	}
	catch (error) {
		logger.error(error.message);
		process.exit(1);
	}
	finally {
		logger.success('Startup config is good!');
		logger.log('Loading bot...');
	}
	// Register Events and Command
	client.loadCommands(path.join(__dirname, 'src/commands'));
	client.loadEvents(path.join(__dirname, 'src/events'));

	// Login to Discord
	client.login(token);
})();