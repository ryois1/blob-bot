const { ApplicationCommandOptionType } = require('discord.js');
const { Command, EmbedResponse } = require('@src/structures');

module.exports = class Avatar extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			description: 'Sets the bot avatar.',
			category: 'utility',
			ownerOnly: true,
			slashCommand: {
				enabled: true,
				options: [
					{
						name: 'url',
						description: 'Publicly accessible image URL',
						type: ApplicationCommandOptionType.String,
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		const url = interaction.options.getString('url');
		interaction.client.user.setAvatar();
		interaction.client.logger.log(`Successfully set the avatar of the bot to ${url}}.`);
		const responseData = {
			title: 'Successfully set the avatar of the bot',
			image: url,
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.reply({ embeds: [response.build()] });
	}
};