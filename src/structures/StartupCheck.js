const logger = require('@src/helpers/logger');

const ascii = `\n ________  ___       ________  ________          ________  ________  _________  
|\\   __  \\|\\  \\     |\\   __  \\|\\   __  \\        |\\   __  \\|\\   __  \\|\\___   ___\\
\\ \\  \\|\\ /\\ \\  \\    \\ \\  \\|\\  \\ \\  \\|\\ /_       \\ \\  \\|\\ /\\ \\  \\|\\  \\|___ \\  \\_|
 \\ \\   __  \\ \\  \\    \\ \\  \\\\\\  \\ \\   __  \\       \\ \\   __  \\ \\  \\\\\\  \\   \\ \\  \\
  \\ \\  \\|\\  \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\|\\  \\       \\ \\  \\|\\  \\ \\  \\\\\\  \\   \\ \\  \\
   \\ \\_______\\ \\_______\\ \\_______\\ \\_______\\       \\ \\_______\\ \\_______\\   \\ \\__\\
    \\|_______|\\|_______|\\|_______|\\|_______|        \\|_______|\\|_______|    \\|__|
                                                                                 
                                                                                 
                                                                                  `;
logger.log(ascii);

class StartupChecker {
	constructor(config, db) {
		this.config = config;
		this.db = db;
	}

	async checkConfig() {
		logger.log('Checking that required values in config.js are present.');
		// Check that all required config values are present
		const requiredValues = ['EMBED_COLORS', 'OWNER_IDS'];
		for (const value of requiredValues) {
			if (!Object.prototype.hasOwnProperty.call(this.config, value)) {
				throw new Error(`Missing required config value: ${value}`);
			}
		}

		// Check that all required env var values are present
		logger.log('Checking that required values in process.env are present.');
		const requiredEnvVarValues = ['THAT_API_CO_KEY', 'ERROR_LOGS', 'MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE', 'DISCORD_CLIENT_ID', 'DISCORD_TOKEN'];
		for (const value of requiredEnvVarValues) {
			if (!Object.prototype.hasOwnProperty.call(process.env, value)) {
				throw new Error(`Missing required process.env value: ${value}`);
			}
		}
	}

	async checkDatabaseConnection() {
		// Test the database connection by running a simple query
		try {
			logger.log('Trying a query against the database.');
			await this.db.query('SELECT 1');
		}
		catch (error) {
			throw new Error(`Error connecting to database: ${error.message}`);
		}
		finally {
			logger.success('Database is functional.');
		}
	}
}

module.exports = StartupChecker;