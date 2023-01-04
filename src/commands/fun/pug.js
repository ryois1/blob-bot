const { Command, EmbedResponse } = require('@src/structures');

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
		const responseData = {
			title: '🐶 Here is your pug!',
			image: res.data.message,
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.reply({ embeds: [response.build()] });
	}
};