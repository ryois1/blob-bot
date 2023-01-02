const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: false,
	category: 'fun',
	data: new SlashCommandBuilder()
		.setName('pug')
		.setDescription('Finds a cute pug picture!'),

	async execute(interaction) {
		const res = await axios.get('https://dog.ceo/api/breed/pug/images/random');
		const pugEmbed = new EmbedBuilder()
			.setColor(interaction.client.config.EMBED_COLORS.BOT_EMBED)
			.setTitle('🐶 Here is your pug!')
			.setImage(res.data.message);
		await interaction.reply({ embeds: [pugEmbed] });
	},
};