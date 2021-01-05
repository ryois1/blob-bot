module.exports = {
	name: 'setavatar',
	cooldown: 10,
	usage: '<image>',
	description: 'Set the bot\'s avatar',
	guildOnly: false,
	enabled: true,
	async execute(message, args, client) {
		if (!args.length) {
			return message.reply('you didn\'t provide an image URL!');
		}
		if (message.member.hasPermission('ADMINISTRATOR')) {
			client.user
				.setAvatar(`${args}`)
				.then(() => message.channel.send('Changed avatar of bot'))
				.catch((error) => message.channel.send(`Error: ${error}`));
		}
		else {
			message.reply('you do not have permissions to use this command!');
		}
	},
};
