const { ApplicationCommandOptionType } = require('discord.js');
const { Command, EmbedResponse } = require('@src/structures');

module.exports = class NameColor extends Command {
	constructor(client) {
		super(client, {
			name: 'namecolor',
			description: 'Specify a hex color for your name!',
			category: 'fun',
			guildOnly: true,
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
		console.log(interaction.member.guild);
		const hex = interaction.options.getString('hex');
		const member = interaction.member.guild.members.resolve(interaction.user.id);
		console.log(member);
		const regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
		if (hex == null) {
			const responseData = {
				title: 'ERROR: I need a hex color',
				color: 'ERROR',
			};
			const response = new EmbedResponse(responseData, interaction.client);
			await interaction.reply({ embeds: [response.build()], ephemeral: true });
		}
		if (regex.test(hex) == true) {
			const guild = interaction.guild;
			const roleName = member.user.id;
			const role = interaction.guild.roles.cache.find(x => x.name == roleName);
			if (!role) {
				guild.roles.create({
					name: `${interaction.user.id}`,
					color: `${hex}`,
				}).then((userRole) => {
					console.log(userRole);
					member.roles.add(userRole);
				});
			}
			else {
				role.setColor(hex);
			}
			const responseData = {
				title: 'I successfully changed your name\'s color',
			};
			const response = new EmbedResponse(responseData, interaction.client);
			await interaction.reply({ embeds: [response.build()], ephemeral: true });
		}
		else {
			const responseData = {
				title: 'ERROR: I need a valid hex color (#RRGGBB)',
				color: 'ERROR',
			};
			const response = new EmbedResponse(responseData, interaction.client);
			await interaction.reply({ embeds: [response.build()], ephemeral: true });
		}
	}
};