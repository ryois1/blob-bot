module.exports = {
	name: 'jumbo',
	cooldown: 0.5,
	usage: '<Emoji>',
	description: 'Wumbo an emoji!',
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t provide an emoji to jumbo!');
		}
		message.delete({ timeout: 500 });
		const https = require('https');
		const regexp = /<(a){0,1}:([A-Za-z0-9_.]+):([0-9]+)>/g;
		const matches = args[0].matchAll(regexp);
		for (const match of matches) {
			const animated = match[1];
			const emojiID = match[3];
			if(animated == 'a') {
				args.shift();
				https.get(
					`https://cdn.discordapp.com/emojis/${emojiID}.gif?v=1`,
					function(res) {
						if (res.statusCode == 200) {
							message.channel.send({
								files: [`https://cdn.discordapp.com/emojis/${emojiID}.gif?v=1`],
							});
						}
						else {
							message.reply('unable to get this emoji.') .then(msg => {
								msg.delete({ timeout: 1500 });
								message.delete({ timeout: 1500 });
							});
						}
					});
			}
			if(animated == null) {
				args.shift();
				https.get(
					`https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`,
					function(res) {
						if (res.statusCode == 200) {
							message.channel.send({
								files: [`https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`],
							});
						}
						else {
							message.reply('unable to get this emoji.') .then(msg => {
								msg.delete({ timeout: 1500 });
								message.delete({ timeout: 1500 });
							});
						}
					});
			}
		}
	},
};