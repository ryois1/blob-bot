const { Command, EmbedResponse } = require('@src/structures');

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
		const res = await interaction.client.axios.get('https://api.thecatapi.com/v1/images/search', {
			headers: {
				'x-api-key' : process.env.THAT_API_CO_KEY,
			},
		});
		const responseData = {
			title: '🐱 Here is your cat!',
			image: res.data[0].url,
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.reply({ embeds: [response.build()] });
	}
};