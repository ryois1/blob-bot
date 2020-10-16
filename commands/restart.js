module.exports = {
	name: 'restart',
	usage: '[Command only]',
	aliases: ['reboot'],
	description: 'Restarts the bot',
	async execute(message, args, client, token) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			console.log('RESTARTED BOT');
			message
				.reply('Restarting the bot...')
				.then(() => client.destroy())
				.then(() => client.login(token));
		}
		else {
			message.reply('you do not have permissions to use this command!');
		}
	},
};
