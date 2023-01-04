const cowsay = require('cowsay');
const { Command } = require('@src/structures');
const { messages, places, colors } = require('@src/content/sus.json');

module.exports = class Eightball extends Command {
	constructor(client) {
		super(client, {
			name: 'cowsus',
			description: 'Sussy tTalking cow 🐄!',
			category: 'fun',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		const guild = interaction.member.guild;
		const members = await guild.members.fetch();
		const message_id = Math.floor(Math.random() * messages.length);
		const user_sus = members.random();
		const user_killed = members.random();
		const user_accused = members.random();
		const place = places[Math.floor(Math.random() * places.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const sus_message = messages[message_id].content
			.replace('$user_sus', `**${user_sus.displayName}**`)
			.replace('$user_killed', `**${user_killed.displayName}**`)
			.replace('$user_accused', `**${user_accused.displayName}**`)
			.replace('$place', `**${place}**`)
			.replace('$color', `**${color}**`)
			;
		const cowsayout = cowsay.say({ text: sus_message });
		await interaction.reply({ content: `\`\`\`${cowsayout}\`\`\`` });
	}
};