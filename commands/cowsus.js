const fs = require('fs');
const cowsay = require('cowsay');

module.exports = {
	name: 'cowsus',
	cooldown: 3,
	usage: '[Command only]',
	description: 'Cowsay but kinda sus!',
	guildOnly: false,
	enabled: true,
	async execute(message) {
		const { messages, places, colors } = JSON.parse(fs.readFileSync('./content/sus.json'));
		const message_id = Math.floor(Math.random() * messages.length);
		const user_sus = message.guild.members.cache.random();
		const user_killed = message.guild.members.cache.random();
		const user_accused = message.guild.members.cache.random();
		const place = places[Math.floor(Math.random() * places.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const sus_message = messages[message_id].content
			.replace('$user_sus', `${user_sus.displayName}`)
			.replace('$user_killed', `${user_killed.displayName}`)
			.replace('$user_accused', `${user_accused.displayName}`)
			.replace('$place', `${place}`)
			.replace('$color', `${color}`)
			;
		const cowsayout = cowsay.say({ text: sus_message });
		message.channel.send(`\`\`\`${cowsayout}\`\`\``);
	},
};
