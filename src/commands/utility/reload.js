const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	enabled: true,
	guildOnly: false,
	ownerOnly: false,
	category: 'utility',
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
			delete require.cache[require.resolve(`@commands/${command.category}/${command.data.name}.js`)];
			const newCommand = require(`@commands/${command.category}/${command.data.name}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply({ content: `Successfully reloaded the command ${command.data.name}.`, ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
		}
	},
};