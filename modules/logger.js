const chalk = require('chalk');
const moment = require('moment');
const config = require('../private/config.json');
function log(client, message) {
	const current_time = moment().format('M/d/YYYY, h:mm:ss A');
	console.log(chalk.green(`[BLOB-BOT LOG - ${current_time}] ${message}`));
	client.channels.cache.get(config.blob_bot_log_channel).send(`[BLOB-BOT LOG - ${current_time}] ${message}`);
}
function error(client, message) {
	const current_time = moment().format('M/d/YYYY, h:mm:ss A');
	console.log(chalk.red(`[BLOB-BOT ERROR - ${current_time}] ${message}`));
	client.channels.cache.get(config.blob_bot_log_channel).send(`[BLOB-BOT ERROR - ${current_time}] ${message}`);
}
module.exports = { log, error };