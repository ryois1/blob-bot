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
		const regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
		if (hex == null) {
			await interaction.reply({ content: 'Invalid hex', ephemeral: true });
		}
		if (regex.test(hex) == true) {
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
		else {
			await interaction.reply({ content: 'Sorry, that\'s an invalid hex code. Must be in the format of #RRGGBB', ephemeral: true });
		}
	}
};