const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		if (!command.enabled) {
			await interaction.reply({ content: 'This command is disabled.', ephemeral: true });
			return;
		}

		if (command.disabledGuilds) {
			if (command.disabledGuilds.includes(`${interaction.guild.id}`)) {
				await interaction.reply({ content: 'This command is disabled in this guild', ephemeral: true });
				return;
			}
		}

		if (command.allowedGuilds) {
			if (!command.allowedGuilds.includes(`${interaction.guild.id}`)) {
				await interaction.reply({ content: 'This command is disabled in this guild', ephemeral: true });
				return;
			}
		}

		if (command.ownerOnly) {
			if (interaction.author.id != '236237361703288842') {
				await interaction.reply({ content: 'This command is only available to the owner', ephemeral: true });
				return;
			}
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};