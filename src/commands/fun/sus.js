const { Command } = require('@src/structures');
const { messages, places, colors } = require('@src/content/sus.json');

module.exports = class Sus extends Command {
	constructor(client) {
		super(client, {
			name: 'sus',
			description: 'Yellow sus.',
			guildOnly: true,
			category: 'fun',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		const channel = interaction.client.channels.cache.get(interaction.channelId);
		const guild = interaction.member.guild;
		const members = await guild.members.fetch();
		const message_id = Math.floor(Math.random() * messages.length);
		const user_sus = members.random();
		const user_killed = members.random();
		const user_accused = members.random();
		const place = places[Math.floor(Math.random() * places.length)];
		const color = colors[Math.floor(Math.random() * colors.length)];
		const sus_message = messages[message_id].content
			.replace('$user_sus', `**${user_sus.displayName}**`)
			.replace('$user_killed', `**${user_killed.displayName}**`)
			.replace('$user_accused', `**${user_accused.displayName}**`)
			.replace('$place', `**${place}**`)
			.replace('$color', `**${color}**`)
			;
		const hooks_len = (await channel.fetchWebhooks()).size;
		if (hooks_len == 0) {
			await channel.createWebhook({
				name: 'sus',
				avatar: 'https://cdn.discordapp.com/attachments/765292850219843645/774848748861390888/5fa5425f96cc0.png',
			});
		}
		const hooks = await channel.fetchWebhooks();
		const webhook = hooks.first();
		let webhook_username = null;
		let webhook_avatar = null;
		if (messages[message_id].is_game) {
			webhook_username = 'Among Us';
		}
		else {
			webhook_username = user_accused.displayName;
		}
		if (messages[message_id].is_game) {
			webhook_avatar = 'https://cdn.discordapp.com/attachments/765300137635348510/780153548696453190/Among_Us.png';
		}
		else {
			webhook_avatar = user_accused.user.displayAvatarURL();
		}
		webhook.send(sus_message, {
			username: webhook_username,
			avatarURL: webhook_avatar,
		});
		await interaction.deferReply({ ephemeral: true });
		await interaction.deleteReply();
	}
};