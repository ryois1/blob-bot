const { EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
// Import base command
const Command = require('@src/structure/Command');
module.exports = class Cat extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			description: 'Finds a cute cat picture!',
			category: 'fun',
			slashCommand: {
				enabled: true,
			},
		});
	}
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
	}
};