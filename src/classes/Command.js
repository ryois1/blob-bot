class Command {
	/**
     * @param {import('discord.js').Client} client - The discord client
     * @param {CommandData} data - The command information
     */
	constructor(client, data) {
		this.client = client;
		this.name = data.name;
		this.category = data.category || 'NONE';
		this.enabled = data.enabled || true;
		this.guildOnly = data.guildOnly || false;
		this.globallyEnabled = data.globallyEnabled || true;
		this.ownerOnly = data.ownerOnly || false;
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


	/**
     *
     * @param {import('discord.js').CommandInteraction} interaction
     */
	async execute(interaction) {
		// callback validations
		for (const validation of this.validations) {
			if (!validation.callback(interaction)) {
				return interaction.reply({
					content: validation.message,
					ephemeral: true,
				});
			}
		}

	}
}


module.exports = Command;