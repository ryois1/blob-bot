const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	enabled: true,
	guildOnly: false,
	globallyEnabled: false,
	ownerOnly: false,
	category: 'fun',
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Finds a cute cat picture!'),

	async execute(interaction) {
		const res = await axios.get('https://api.thecatapi.com/v1/images/search', {
			headers: {
				'x-api-key' : process.env.THAT_API_CO_KEY,
			},
		});
		const catEmbed = new EmbedBuilder()
			.setColor(interaction.client.config.EMBED_COLORS.BOT_EMBED)
			.setTitle('🐱 Here is your cat!')
			.setImage(res.data[0].url);
		await interaction.reply({ embeds: [catEmbed] });
	},
};