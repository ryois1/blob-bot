const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: true,
	category: 'owner',
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Sets the bot avatar')
		.addStringOption(option =>
			option
				.setName('url')
				.setDescription('Publicly accessible image URL')
				.setRequired(true)),

	async execute(interaction) {
		interaction.client.user.setAvatar(interaction.options.getString('url'));
		await interaction.reply({ content: 'Successfully set the avatar of the bot', ephemeral: true });
	},
};