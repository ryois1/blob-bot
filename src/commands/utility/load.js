const { ApplicationCommandOptionType } = require('discord.js');
const { Command } = require('@src/structures');

module.exports = class Reload extends Command {
	constructor(client) {
		super(client, {
			name: 'load',
			description: 'Loads a command.',
			category: 'utility',
			slashCommand: {
				enabled: true,
				options: [
					{
						name: 'category',
						description: 'category name',
						type: ApplicationCommandOptionType.String,
						required: true,
					},
					{
						name: 'name',
						description: 'filename without .js',
						type: ApplicationCommandOptionType.String,
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		const commandName = interaction.options.getString('name');
		const commandCat = interaction.options.getString('name');
		const newCommand = require(`@src/commands/${commandCat}/${commandName}.js`);
		const cmd = new newCommand(interaction.client);
		interaction.client.commands.set(cmd.name, cmd);
		interaction.client.logger.success(`Successfully reloaded the command "${commandName}".`);
		await interaction.reply({ content: `Successfully reloaded the command "${commandName}".`, ephemeral: true });
	}
};