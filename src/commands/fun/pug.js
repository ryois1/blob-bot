const { EmbedBuilder } = require('discord.js');
const { Command } = require('@src/structures');

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
		const res = await interaction.client.axios.get('https://dog.ceo/api/breed/pug/images/random');
		const pugEmbed = new EmbedBuilder()
			.setColor(interaction.client.config.EMBED_COLORS.BOT_EMBED)
			.setTitle('🐶 Here is your pug!')
			.setImage(res.data.message);
		await interaction.reply({ embeds: [pugEmbed] });
	}
};