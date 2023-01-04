const eightball = require('@src/helpers/8ball');
const { Command, EmbedResponse } = require('@src/structures');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class Eightball extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			description: 'Magic 8 Ball!',
			category: 'fun',
			slashCommand: {
				enabled: true,
				options: [
					{
						name: 'question',
						description: 'Your question for the magic 8 ball',
						type: ApplicationCommandOptionType.String,
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		const question = interaction.options.getString('question');
		const responseData = {
			title: 'Magic 8 Ball 🎱',
			color: 'RANDOM',
			fields: [{ name: 'Question', value: question, inline: false }, { name: 'Answer', value: eightball(), inline: false }],
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.reply({ embeds: [response.build()] });
	}
};