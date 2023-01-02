// Import base command
const Command = require('@src/classes/Command');
module.exports = class Ping extends Command {
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
						type: 'STRING',
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		const commandName = interaction.options.getString('name');
		const command = interaction.client.commands.get(commandName);
		if (!command.data) {
			await interaction.reply({ content: 'There is no command with that name.', ephemeral: true });
		}
		delete require.cache[require.resolve(`@commands/${command.category}/${command.data.name}.js`)];
		const newCommand = require(`@commands/${command.category}/${command.data.name}.js`);
		interaction.client.commands.set(newCommand.data.name, newCommand);

		await interaction.reply({ content: `Successfully reloaded the command ${command.data.name}.`, ephemeral: true });
	}
};