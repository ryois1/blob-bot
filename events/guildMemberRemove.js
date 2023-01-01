const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(guild, client) {
        const channel = client.channels.cache.get('765594416366747658');
        const user = await client.users.fetch(guild.user.id);
        const memberRemoveEmbed = new EmbedBuilder()
            .setColor(0xFF470F)
            .setAuthor({ name: `${user.tag} Left`, iconURL: user.displayAvatarURL({ dynamic: true})})
            .setThumbnail(user.displayAvatarURL({ dynamic: true}))
            .setDescription(`<@${user.id}> ${user.tag}`)
            .setTimestamp()
            .setFooter({ text: `ID: ${user.id}`});
        await channel.send({ embeds: [memberRemoveEmbed] });
    },
};