const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(guild, client) {
		const channel = client.channels.cache.get('765594416366747658');
		const user = await client.users.fetch(guild.user.id);
		const createdDate = user.createdAt;
		const createdString = (createdDate.getMonth() + 1) + '/' + createdDate.getDate() + '/' + createdDate.getFullYear();
		const memberAddEmbed = new EmbedBuilder()
			.setColor(0x43B582)
			.setAuthor({ name: `${user.tag} Joined`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			.setDescription(`<@${user.id}> ${user.tag}`)
			.addFields(
				{ name: 'Created On', value: createdString })
			.setTimestamp()
			.setFooter({ text: `ID: ${user.id}` });
		await channel.send({ embeds: [memberAddEmbed] });
	},
};
