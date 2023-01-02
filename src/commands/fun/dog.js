const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: false,
	category: 'fun',
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Finds a cute dog picture!'),

	async execute(interaction) {
		const res = await axios.get('https://api.thedogapi.com/v1/images/search', {
			headers: {
				'x-api-key' : process.env.THAT_API_CO_KEY,
			},
		});
		const dogEmbed = new EmbedBuilder()
			.setColor(interaction.client.config.EMBED_COLORS.BOT_EMBED)
			.setTitle('🐶 Here is your dog!')
			.setImage(res.data[0].url);
		await interaction.reply({ embeds: [dogEmbed] });
	},
};