const fs = require('fs');

module.exports = {
	name: 'sus',
	cooldown: 0.5,
	usage: '[Command only]',
	description: 'Yellow sus',
	async execute(message) {
		const { messages, places, colors } = JSON.parse(fs.readFileSync('./content/sus_messages.json'));
		const user_sus = message.guild.members.cache.random();
		const user_killed = message.guild.members.cache.random();
		const place = places[Math.floor(Math.random() * places.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const susmessage = messages[Math.floor(Math.random() * messages.length)]
			.replace('$user_sus', `**${user_sus.displayName}**`)
			.replace('$user_killed', `**${user_killed.displayName}**`)
			.replace('$place', `**${place}**`)
			.replace('$color', `**${color}**`)
        ;
		message.channel.send(susmessage);
	},
};