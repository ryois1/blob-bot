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
		if (command.ownerOnly) {
			if (interaction.author.id != '236237361703288842') {
				await interaction.reply({ content: 'This command is only available to the owner', ephemeral: true });
				return;
			}
		}

		interaction.client.db.query('SELECT guild_id FROM commands_disabled_guilds WHERE command_name = ? AND guild_id = ?', [interaction.commandName, interaction.guild.id], async function(disabledError, disabledResult) {
			if (disabledError) console.log (disabledError);
			if (disabledResult.length > 0) {
				console.log('Command disabled in DB disabled_guilds');
				if (disabledResult) {
					await interaction.reply({ content: 'This command is disabled in this guild', ephemeral: true });
					return;
				}
			}
			else {
				interaction.client.db.query('SELECT guild_id FROM commands_enabled_guilds WHERE command_name = ? AND guild_id = ?', [interaction.commandName, interaction.guild.id], async function(enabledError, enabledResult) {
					if (enabledError) console.log (enabledError);
					if (!enabledResult.length) {
						console.log('Command disabled in DB not in enabled_guilds');
						await interaction.reply({ content: 'This command is disabled in this guild', ephemeral: true });
						return;
					}
					else {
						try {
							await command.execute(interaction);
						}
						catch (errorCmd) {
							console.error(`Error executing ${interaction.commandName}`);
							console.error(errorCmd);
						}
					}
				});
			}
		});

		/* if (command.disabledGuilds) {
			if (command.disabledGuilds.includes(`${interaction.guild.id}`)) {
				await interaction.reply({ content: 'This command is disabled in this guild', ephemeral: true });
				return;
			}
		} */


		/* if (command.allowedGuilds) {
			if (!command.allowedGuilds.includes(`${interaction.guild.id}`)) {
				await interaction.reply({ content: 'This command is disabled in this guild', ephemeral: true });
				return;
			}
		} */


	},
};