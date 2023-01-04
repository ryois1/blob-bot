const { ApplicationCommandOptionType } = require('discord.js');
const { Command } = require('@src/structures');

module.exports = class Reload extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			description: 'Reloads a command.',
			category: 'utility',
			slashCommand: {
				enabled: true,
				options: [
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
		const command = interaction.client.commands.get(commandName);
		if (!command.slashCommand) {
			await interaction.reply({ content: 'There is no slash command with that name.', ephemeral: true });
			return;
		}
		delete require.cache[require.resolve(`@src/commands/${command.category}/${command.name}.js`)];
		const newCommand = require(`@src/commands/${command.category}/${command.name}.js`);
		const cmd = new newCommand(interaction.client);
		interaction.client.commands.set(cmd.name, cmd);
		interaction.client.logger.success(`Successfully reloaded the command "${command.name}".`);
		await interaction.reply({ content: `Successfully reloaded the command "${command.name}".`, ephemeral: true });
	}
};