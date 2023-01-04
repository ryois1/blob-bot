require('module-alias/register');
const logger = require('@src/helpers/logger');
const mysql = require('mysql');
const { Client, REST, Routes, GatewayIntentBits } = require('discord.js');

const config = process.env;
const token = config.DISCORD_TOKEN;
const clientId = config.DISCORD_CLIENT_ID;
const path = require('node:path');
const fs = require('node:fs');
const pool = mysql.createPool({
	host: config.MYSQL_HOST,
	user: config.MYSQL_USER,
	password: config.MYSQL_PASSWORD,
	database: config.MYSQL_DATABASE,
	connectionLimit: 10,
});
pool.getConnection(function(err) {
	if (err) {
		logger.error('Error error connecting to database.', err);
		throw err;
	}
	logger.log('Connected to database.');
});
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [];

const commandsPath = path.join(__dirname, 'src/commands');
const commandsFolders = fs.readdirSync(commandsPath);

for (const folder of commandsFolders) {
	const files = fs.readdirSync(`${commandsPath}/${folder}`);
	for (const file of files) {
		const command = require(`${commandsPath}/${folder}/${file}`);
		const cmd = new command(client);
		logger.log(`Found command "${cmd.name}", with flags "globallyEnabled": ${cmd.globallyEnabled} and "guildOnly": ${cmd.guildOnly}`);
		pool.query('INSERT INTO commands (command_name, command_category, globally_enabled, guilds_only) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE globally_enabled=?, guilds_only=?', [cmd.name, cmd.category, cmd.globallyEnabled, cmd.guildOnly, cmd.globallyEnabled, cmd.guildOnly], async function(error) {
			if (error) logger.error(error);
		});
		commands.push(cmd.toJSON());
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		logger.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		logger.success(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		logger.error(error);
	}
	finally {
		pool.end();
		logger.log('Done');
		process.exit();
	}
})();