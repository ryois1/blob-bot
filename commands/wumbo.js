module.exports = {
	name: 'wumbo',
	usage: '<Non animated Emoji>',
	description: 'Wumbo an emoji!',
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t provide an emoji to jumbo!');
		}
		const https = require('https');
		const regexp = /<(a){0,1}:([A-Za-z0-9_.]+):([0-9]+)>/g;
		const matches = message.content.matchAll(regexp);
		for (const match of matches) {
			const emojiID = match[3];
			args.shift();
			const messageSend = args.join(' ');
			https.get(
				`https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`,
				function(res) {
					if (res.statusCode == 200) {
						message.channel.send(`${messageSend}`, {
							files: [`https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`],
						});
					}
					else {
						message.reply(
							'oof unable to get this emoji, is it a gif? try using !jumbo',
						);
					}
				});
		}
	},
};