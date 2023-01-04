const { Command, EmbedResponse } = require('@src/structures');
// Import base command
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
		const res = await interaction.client.axios.get('https://api.thedogapi.com/v1/images/search', {
			headers: {
				'x-api-key' : process.env.THAT_API_CO_KEY,
			},
		});
		const responseData = {
			title: '🐶 Here is your dog!',
			image: res.data[0].url,
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.reply({ embeds: [response.build()] });
	}
};