const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: false,
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command')
		.addStringOption(option =>
			option
				.setName('commandname')
				.setDescription('filename without .js')
				.setRequired(true)),

	async execute(interaction) {
		if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
			const commandName = interaction.options.getString('commandname');
			const command = interaction.client.commands.get(commandName);
			if (!command.data) {
				await interaction.reply({ content: 'There is no command with that name.', ephemeral: true });
			}
			delete require.cache[require.resolve(`./${command.data.name}.js`)];
			try {
				const newCommand = require(`./${command.data.name}.js`);
				interaction.client.commands.set(newCommand.data.name, newCommand);
			}
			catch (error) {
				await interaction.reply({ content: `There was an error reloading the command ${command.data.name}.`, ephemeral: true });

			}
			await interaction.reply({ content: `Successfully reloaded the command ${command.data.name}.`, ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
		}
	},
};