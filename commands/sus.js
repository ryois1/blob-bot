const fs = require('fs');

module.exports = {
	name: 'sus',
	cooldown: 0.5,
	usage: '[Command only]',
	description: 'Yellow sus',
	guildOnly: true,
	enabled: true,
	async execute(message) {
		const { channel } = message;
		const { messages, places, colors } = JSON.parse(fs.readFileSync('./content/sus.json'));
		const message_id = Math.floor(Math.random() * messages.length);
		const user_sus = message.guild.members.cache.random();
		const user_killed = message.guild.members.cache.random();
		const user_accused = message.guild.members.cache.random();
		const place = places[Math.floor(Math.random() * places.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const sus_message = messages[message_id].content
			.replace('$user_sus', `**${user_sus.displayName}**`)
			.replace('$user_killed', `**${user_killed.displayName}**`)
			.replace('$user_accused', `**${user_accused.displayName}**`)
			.replace('$place', `**${place}**`)
			.replace('$color', `**${color}**`)
			;
		const hooks_len = (await channel.fetchWebhooks()).size;

		if (hooks_len == 0) {
			await channel.createWebhook('sus', {
				avatar: 'https://cdn.discordapp.com/attachments/765292850219843645/774848748861390888/5fa5425f96cc0.png',
				reason: 'sus',
			});
		}

		const hooks = await channel.fetchWebhooks();
		const webhook = hooks.first();
		let webhook_username = null;
		let webhook_avatar = null;
		if (messages[message_id].is_game) {
			webhook_username = 'Among Us';
		}
		else {
			webhook_username = user_accused.displayName;
		}
		if (messages[message_id].is_game) {
			webhook_avatar = 'https://cdn.discordapp.com/attachments/765300137635348510/780153548696453190/Among_Us.png';
		}
		else {
			webhook_avatar = user_accused.user.displayAvatarURL();
		}
		webhook.send(sus_message, {
			username: webhook_username,
			avatarURL: webhook_avatar,
		})
			.then(
				message.delete({ timeout: 100 }),
			);
	},
};