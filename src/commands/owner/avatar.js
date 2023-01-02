// Import base command
const Command = require('@src/classes/Command');
module.exports = class Ping extends Command {
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
						type: 'STRING',
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		interaction.client.user.setAvatar(interaction.options.getString('url'));
		await interaction.reply({ content: 'Successfully set the avatar of the bot', ephemeral: true });
	}
};