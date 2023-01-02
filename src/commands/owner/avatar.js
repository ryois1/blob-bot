const { ApplicationCommandOptionType } = require('discord.js');

// Import base command
const Command = require('@src/classes/Command');
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
		interaction.client.user.setAvatar(interaction.options.getString('url'));
		interaction.client.logger.log(`Successfully set the avatar of the bot to ${interaction.options.getString('url')}.`);
		await interaction.reply({ content: 'Successfully set the avatar of the bot', ephemeral: true });
	}
};