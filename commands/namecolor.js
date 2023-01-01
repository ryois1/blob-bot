const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	enabled: true,
	guildOnly: true,
	ownerOnly: false,
	data: new SlashCommandBuilder()
		.setName('namecolor')
		.setDescription('Specify a hex color for your name!')
		.addStringOption(option =>
			option
				.setName('hex')
				.setDescription('Hex Color for Role')
				.setRequired(true)),

	async execute(interaction) {
		const hex = interaction.options.getString('hex');
		const guild = interaction.guild;
		const roleName = `${interaction.user.id}`;
		const role = interaction.guild.roles.cache.find(x => x.name == roleName);
		if (!role) {
			try {
				guild.roles.create({
					data: {
						name: `${interaction.user.id}`,
						color: `${hex}`,
					},
				}).then((userRole) => interaction.user.roles.add(userRole))
					.catch((error) => {
						// logger.error(client, error);
						interaction.reply({ content: `Failed to update role: ${error}`, ephemeral: true });
					});
			}
			catch (error) {
				// logger.error(client, error);
				interaction.reply({ content: `Failed to update role: ${error}`, ephemeral: true });
			}
		}
		else {
			role.setColor(hex);
		}

		await interaction.reply({ content: `Changed your name's color to ${hex}!`, ephemeral: true });
	},
};