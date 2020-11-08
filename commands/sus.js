const fs = require('fs');

module.exports = {
	name: 'sus',
	cooldown: 0.5,
	usage: '[Command only]',
	description: 'Yellow sus',
	async execute(message) {
		const { channel } = message;
		const { messages, places, colors } = JSON.parse(fs.readFileSync('./content/sus_messages.json'));

		const user_accused = message.guild.members.cache.random().user;
		const user_sus = message.guild.members.cache.random().user;

		const user_killed = message.guild.members.cache.random().user;
		const place = places[Math.floor(Math.random() * places.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];

		const susmessage = messages[Math.floor(Math.random() * messages.length)]
			.slice(0)
			.replace('$user_sus', `**${user_sus.username}**`)
			.replace('$user_killed', `**${user_killed.username}**`)
			.replace('$place', `**${place}**`)
			.replace('$color', `**${color}**`)
		;


		const hooks_len = (await channel.fetchWebhooks()).size;

		if (hooks_len == 0) {
			await channel.createWebhook('sus', {
				avatar: 'https://cdn.discordapp.com/attachments/765292850219843645/774848748861390888/5fa5425f96cc0.png',
				reason: 'sus'
			});
		}
	
		const hooks = await channel.fetchWebhooks();
		const webhook = hooks.first();
	
		webhook.send(susmessage, {
			username: `${user_accused.member && user_accused.member.displayName || user_accused.username}`,
			avatarURL: message.author.displayAvatarURL()
		});
	},
};