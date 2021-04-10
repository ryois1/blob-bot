const axios = require('axios');

function log(client, message) {
	const chalk = require('chalk');
	const config = require('../private/config.json');
	const moment = require('moment');
	const current_time = moment().format('M/d/YYYY, h:mm:ss A');
	console.log(chalk.green(`[BLOB-BOT LOG - ${current_time}] ${message}`));
	axios.post('https://haste.ryois.me/documents', { message })
		.then(function(response) {
			client.channels.cache.get(config.blob_bot_log_channel).send(`[BLOB-BOT LOG - ${current_time}] https://haste.ryois.me/${response.data.key}`);
		});
}
function error(client, message) {
	const chalk = require('chalk');
	const moment = require('moment');
	const current_time = moment().format('M/d/YYYY, h:mm:ss A');
	const config = require('../private/config.json');
	console.log(chalk.red(`[BLOB-BOT ERROR - ${current_time}] ${message}`));
	console.log(message);
	const Sentry = require('@sentry/node');
	Sentry.init({
		dsn: config.SENTRY_DSN,
		tracesSampleRate: 1.0,
	});
	Sentry.captureException(message);
	client.channels.cache.get(config.blob_bot_log_channel).send(`[BLOB-BOT ERROR - ${current_time}] Please check Sentry`);
}
module.exports = { log, error };