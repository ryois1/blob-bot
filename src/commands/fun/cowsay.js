const cowsay = require('cowsay');
const { Command } = require('@src/structures');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class Eightball extends Command {
	constructor(client) {
		super(client, {
			name: 'cowsay',
			description: 'Talking cow 🐄!',
			category: 'fun',
			slashCommand: {
				enabled: true,
				options: [
					{
						name: 'moo',
						description: 'Moooooo',
						type: ApplicationCommandOptionType.String,
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		let moo = interaction.options.getString('moo');
		moo = moo.replace(/[^a-zA-Z0-9,.!:?/ ]/g, '');
		let cowsayout = '';
		if (moo.length > 0 && moo.length < 1376) {
			cowsayout = cowsay.say({ text: moo });
		}
		else {
			cowsayout = cowsay.say({ text: 'The cow did not like that message. (it was either too large or nothing was sent)' });
		}
		await interaction.reply({ content: `\`\`\`${cowsayout}\`\`\`` });
	}
};