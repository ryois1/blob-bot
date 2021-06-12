module.exports = {
	name: 'setavatar',
	cooldown: 10,
	usage: '<image>',
	description: 'Set the bot\'s avatar',
	guildOnly: false,
	enabled: true,
	ownerOnly: true,
	disabledGuilds: ['851802737662099456'],
	execute(message, args, client, token, config, logger) {
		if (!args.length) {
			return message.reply('you didn\'t provide an image URL!');
		}
		client.user
			.setAvatar(`${args}`)
			.then(() => message.channel.send('Changed avatar of bot'))
			.catch((error) => {
				logger.error(client, error);
				message.channel.send(`Error: ${error}`);
			});
	},
};
