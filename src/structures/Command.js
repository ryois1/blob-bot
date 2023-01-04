const { parsePermissions } = require('@src/utils/botUtils');
const { timeformat } = require('@src/utils/miscUtils');

class Command {
	/**
		  * @property {import('discord.js').ApplicationCommandOptionData[]} options - command options
	* @property {import('discord.js').ApplicationCommandOptionType}
		  */
	/**
	* @param {import('discord.js').Client} client - The discord client
	* @param {CommandData} data - The command information
	*/
	constructor(client, data) {
		this.client = client;
		this.name = data.name;
		this.description = data.description ?? 'NONE';
		this.category = data.category ?? 'NONE';
		this.enabled = data.enabled ?? true;
		this.cooldown = data.cooldown || 0;
		this.guildOnly = data.guildOnly ?? false;
		this.globallyEnabled = data.globallyEnabled ?? false;
		this.ownerOnly = data.ownerOnly ?? false;
		this.botPermissions = data.botPermissions || [];
		this.userPermissions = data.userPermissions || [];
		/**
		 * @type {InteractionInfo}
		 */
		if (data.slashCommand) {
			if (data.slashCommand.enabled && typeof this.execute !== 'function') {
				throw new Error(`Command ${this.name} doesn't has a execute function`);
			}

			this.slashCommand = data.slashCommand;
			this.slashCommand.enabled = Object.prototype.hasOwnProperty.call(data.slashCommand, 'enabled')
				? data.slashCommand.enabled
				: false;
			this.slashCommand.options = data.slashCommand.options || [];
		}
	}
	async isCommandEnabled(interaction) {
		return new Promise((resolve) => {
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
	}
	/**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async executeInteraction(interaction) {

		// Disabled commands
		if (!this.enabled) {
			return interaction.reply({
				content: 'This command is gobally disabled.',
				ephemeral: true,
			});
		}

		// Owner commands
		if (this.ownerOnly && !this.client.config.OWNER_IDS.includes(interaction.user.id)) {
			return interaction.reply({
				content: 'This command is only available to the bot owner.',
				ephemeral: true,
			});
		}

		const isEnabled = await this.isCommandEnabled(interaction);
		// Disabled commands
		if (isEnabled[0]) {
			return interaction.reply({
				content: `This ${isEnabled[1]}.`,
				ephemeral: true,
			});
		}

		// user permissions
		if (interaction.member && this.userPermissions.length > 0) {
			if (!interaction.member.permissions.has(this.userPermissions)) {
				return interaction.reply({
					content: `You need ${parsePermissions(this.userPermissions)} for this command`,
					ephemeral: true,
				});
			}
		}

		// bot permissions
		if (this.botPermissions.length > 0) {
			if (!interaction.guild.me.permissions.has(this.botPermissions)) {
				return interaction.reply({
					content: `I need ${parsePermissions(this.botPermissions)} for this command`,
					ephemeral: true,
				});
			}
		}

		// cooldown check

		if (this.cooldown > 0) {
			const remaining = this.getRemainingCooldown(interaction.user.id);
			if (remaining > 0) {
				return interaction.reply({
					content: `You are on cooldown. You can again use the command in \`${timeformat(remaining)}\``,
					ephemeral: true,
				});
			}
		}

		try {
			// await interaction.deferReply({ ephemeral: this.slashCommand.ephemeral });
			await this.execute(interaction);
		}
		catch (ex) {
			await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
			// await interaction.followUp('Oops! An error occurred while running the command.');
			this.client.logger.error('[InteractionRun]', ex);
		}
		finally {
			this.applyCooldown(interaction.user.id);
		}
	}
	getRemainingCooldown(memberId) {
		const key = this.name + '|' + memberId;
		if (this.client.cmdCooldownCache.has(key)) {
			const remaining = (Date.now() - this.client.cmdCooldownCache.get(key)) * 0.001;
			if (remaining > this.cooldown) {
				this.client.cmdCooldownCache.delete(key);
				return 0;
			}
			return this.cooldown - remaining;
		}
		return 0;
	}

	applyCooldown(memberId) {
		const key = this.name + '|' + memberId;
		this.client.cmdCooldownCache.set(key, Date.now());
	}
	// Overrides default toJSON for Discord Application Command Ingest
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			options: this.slashCommand.options,
			name_localizations: undefined,
			description_localizations: undefined,
			default_permission: undefined,
			default_member_permissions: undefined,
			dm_permission: undefined,
		};
	}
}

module.exports = Command;