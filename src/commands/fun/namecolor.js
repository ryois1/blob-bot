const { ApplicationCommandOptionType } = require('discord.js');
const { Command } = require('@src/structures');

module.exports = class NameColor extends Command {
	constructor(client) {
		super(client, {
			name: 'namecolor',
			description: 'Specify a hex color for your name!',
			category: 'fun',
			slashCommand: {
				enabled: true,
				options: [
					{
						name: 'hex',
						description: 'Hex Color for Role',
						type: ApplicationCommandOptionType.String,
						required: true,
					},
				],
			},
		});
	}
	async execute(interaction) {
		const hex = interaction.options.getString('hex');
		const guild = interaction.guild;
		const roleName = `${interaction.user.id}`;
		const role = interaction.guild.roles.cache.find(x => x.name == roleName);
		if (!role) {
			guild.roles.create({
				data: {
					name: `${interaction.user.id}`,
					color: `${hex}`,
				},
			}).then((userRole) => interaction.user.roles.add(userRole));
		}
		else {
			role.setColor(hex);
		}

		await interaction.reply({ content: `Changed your name's color to ${hex}!`, ephemeral: true });
	}
};