const { Command } = require('@src/structures');

module.exports = class Butt extends Command {
	constructor(client) {
		super(client, {
			name: 'butt',
			description: 'Butt',
			category: 'fun',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		await interaction.reply({ content: '<a:buttrave:765594101675851817>' });
	}
};