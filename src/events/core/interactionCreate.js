/* eslint-disable no-empty-function */
const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// Slash Command
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (command) await command.executeInteraction(interaction);
			else return interaction.reply({ content: 'An error has occurred', ephemeral: true }).catch(() => { });
		}
		/** TODO: ADD Context Menu
		// Context Menu
		else if (interaction.isContextMenu()) {
			const context = interaction.client.contextMenus.get(interaction.commandName);
			if (context) await context.execute(interaction);
			else return interaction.reply({ content: 'An error has occurred', ephemeral: true }).catch(() => { });
		}
		*/
		/** TODO: ADD Button Handling
		// Custom Buttons
		else if (interaction.isButton()) {
			// ticket create
			if (interaction.customId === 'TICKET_CREATE') {
				await interaction.deferReply({ ephemeral: true });
				await handleTicketOpen(interaction);
			}

			// ticket close
			if (interaction.customId === 'TICKET_CLOSE') {
				await interaction.deferReply({ ephemeral: true });
				await handleTicketClose(interaction);
			}
		}
		*/
	},
};