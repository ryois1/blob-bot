const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: false,
	category: 'fun',
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Finds a cute cat picture!'),

	async execute(interaction) {
		const catEmbed = new EmbedBuilder()
			.setColor(interaction.client.config.EMBED_COLORS.BOT_EMBED)
			.setTitle('Here is your cat!')
			.setImage(`https://cataas.com/cat?t=${Date.now()}`);

		await interaction.reply({ embeds: [catEmbed] });
	},
};