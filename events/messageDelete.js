const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message, client) {
        const channel = client.channels.cache.get('765594416366747658');
        const user = await client.users.fetch(message.author.id);
        const deleteEmbed = new EmbedBuilder()
            .setColor(0xFF470F)
            .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true})})
            .setDescription(`**Message sent by <@${user.id}> Deleted in <#${message.channelId}>**\n${message.content}`)
            .setTimestamp()
            .setFooter({ text: `Author: ${user.id} | Message ID: ${message.id}`});
        await channel.send({ embeds: [deleteEmbed] });
    },
};