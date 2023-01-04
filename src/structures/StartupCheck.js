const ascii = ` ________  ___       ________  ________          ________  ________  _________  
|\\   __  \\|\\  \\     |\\   __  \\|\\   __  \\        |\\   __  \\|\\   __  \\|\\___   ___\\
\\ \\  \\|\\ /\\ \\  \\    \\ \\  \\|\\  \\ \\  \\|\\ /_       \\ \\  \\|\\ /\\ \\  \\|\\  \\|___ \\  \\_|
 \\ \\   __  \\ \\  \\    \\ \\  \\\\\\  \\ \\   __  \\       \\ \\   __  \\ \\  \\\\\\  \\   \\ \\  \\
  \\ \\  \\|\\  \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\|\\  \\       \\ \\  \\|\\  \\ \\  \\\\\\  \\   \\ \\  \\
   \\ \\_______\\ \\_______\\ \\_______\\ \\_______\\       \\ \\_______\\ \\_______\\   \\ \\__\\
    \\|_______|\\|_______|\\|_______|\\|_______|        \\|_______|\\|_______|    \\|__|
                                                                                 
                                                                                 
                                                                                  `;
console.log(ascii);

class StartupChecker {
	constructor(config, db) {
		this.config = config;
		this.db = db;
	}

	async checkConfig() {
		// Check that all required config values are present
		const requiredValues = ['EMBED_COLORS', 'OWNER_IDS'];
		for (const value of requiredValues) {
			// eslint-disable-next-line no-prototype-builtins
			if (!this.config.hasOwnProperty(value)) {
				throw new Error(`Missing required config value: ${value}`);
			}
		}

		// Check that all required env var values are present
		const requiredEnvVarValues = ['THAT_API_CO_KEY', 'ERROR_LOGS', 'MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE', 'DISCORD_CLIENT_ID', 'DISCORD_TOKEN'];
		for (const value of requiredEnvVarValues) {
			// eslint-disable-next-line no-prototype-builtins
			if (!process.env.hasOwnProperty(value)) {
				throw new Error(`Missing required env var value: ${value}`);
			}
		}
	}

	async checkDatabaseConnection() {
		// Test the database connection by running a simple query
		try {
			await this.db.query('SELECT 1');
		}
		catch (error) {
			throw new Error(`Error connecting to database: ${error.message}`);
		}
	}
}

module.exports = StartupChecker;