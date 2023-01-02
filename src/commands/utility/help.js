// Import base command
const Command = require('@src/classes/Command');
module.exports = class Help extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			description: 'Help Command',
			globallyEnabled: true,
			category: 'utility',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		// Respond with the time between now and when the user sent their message
		console.log(interaction.client.commands);
		interaction.editReply('wip');
	}
};