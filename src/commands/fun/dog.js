const { EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
// Import base command
const Command = require('@src/structure/Command');
module.exports = class Dog extends Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			description: 'Finds a cute dog picture!',
			category: 'fun',
			slashCommand: {
				enabled: true,
			},
		});
	}
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
	}
};