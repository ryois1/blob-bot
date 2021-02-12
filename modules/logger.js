function log(client, message) {
	const chalk = require('chalk');
	const config = require('../private/config.json');
	console.log(chalk.green(`[BLOB-BOT LOG] ${message}`));
	client.channels.cache.get(config.blob_bot_log_channel).send(`[BLOB-BOT LOG] ${message}`);
}
function error(client, message) {
	const chalk = require('chalk');
	const config = require('../private/config.json');
	console.log(chalk.red(`[BLOB-BOT ERROR] ${message}`));
	client.channels.cache.get(config.blob_bot_log_channel).send(`[BLOB-BOT ERROR] ${message}`);
}
module.exports = { log, error };