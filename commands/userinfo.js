module.exports = {
  name: 'userinfo',
  usage: '<user>',
  description: 'Get the info of a user',
  async execute(message, args) {
    if (!args.length) {
      return message.reply(`you didn't mention anyone!`);
    }
    const Discord = require('discord.js');
    const member =
      message.mentions.members.first() ||
      message.guild.members.get(args[0]) ||
      message.member;
    let target = message.mentions.users.first() || message.author;
    let embed = new Discord.MessageEmbed()
      .setTitle(`${member.user.tag}'s info`)
      .setThumbnail(target.displayAvatarURL())
      .setColor('#00ff00')
      .addFields(
        { name: 'Full Username', value: `${member.user.tag}`, inline: true },
        {
          name: 'Nickname',
          value: `${
            member.nickname !== null ? `Nickname: ${member.nickname}` : 'None'
          }`,
          inline: true,
        },
        {
          name: 'Joined Discord At',
          value: member.user.createdAt,
          inline: true,
        }
      )
      .setFooter(`Information about ${member.user.username}`)
      .setTimestamp();
    message.channel.send(embed);
  },
};
