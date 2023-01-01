const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage, client) {
        const channel = client.channels.cache.get('765594416366747658');
        const user = await client.users.fetch(oldMessage.author.id);
        const updateEmbed = new EmbedBuilder()
            .setColor(0x337FD5)
            .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true})})
            .setDescription(`**Message edited in <#${oldMessage.channelId}>** [Jump to Message](${newMessage.url})`)
			.addFields(
				{ name: 'Before', value: oldMessage.content },
				{ name: 'After', value: newMessage.content })
            .setTimestamp()
            .setFooter({ text: `Author: ${user.id} | Message ID: ${oldMessage.id}`});
        await channel.send({ embeds: [updateEmbed] });
    },
};