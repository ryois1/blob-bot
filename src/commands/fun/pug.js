const { EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
// Import base command
const Command = require('@src/classes/Command');
module.exports = class Pug extends Command {
	constructor(client) {
		super(client, {
			name: 'pug',
			description: 'Finds a cute pug picture!',
			category: 'fun',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		const res = await axios.get('https://dog.ceo/api/breed/pug/images/random');
		const pugEmbed = new EmbedBuilder()
			.setColor(interaction.client.config.EMBED_COLORS.BOT_EMBED)
			.setTitle('🐶 Here is your pug!')
			.setImage(res.data.message);
		await interaction.reply({ embeds: [pugEmbed] });
	}
};