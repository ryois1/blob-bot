const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async isCommandEnabled(interaction, command) {
		return new Promise((resolve) => {
			if (!command.enabled) resolve([false, 'command is gobally disabled']);
			if (command.ownerOnly) {
				if (interaction.client.config.OWNER_IDS.includes(interaction.user.id)) resolve([true]);
				else resolve([false, 'command is only available to the bot owner.']);
			}
			if (interaction.guildId == null) resolve([true]);
			interaction.client.db.query('SELECT status FROM commands_guilds WHERE command_name = ? AND guild_id = ?', [interaction.commandName, interaction.guild.id], async function(error, result) {
				if (error) interaction.client.logger.error(error);
				if (result.length > 0) {
					if (result[0].status) resolve([true]);
					else resolve([false, 'command is disabled for this server']);
				}
				else { resolve([false, 'command is disabled for this server']); }
			});
		});
	},
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			await interaction.reply({ content: 'No command found.', ephemeral: true });
			interaction.client.logger.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const isEnabled = await this.isCommandEnabled(interaction, command);
		if (isEnabled[0]) {
			try {
				await command.execute(interaction);
			}
			catch (error) {
				await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
				interaction.client.logger.error(`Error executing ${interaction.commandName}`, error);
			}
		}
		else {
			await interaction.reply({ content: `This ${isEnabled[1]}.`, ephemeral: true });
			return;
		}
	},
};