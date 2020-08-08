module.exports = {
  name: "ban",
  usage: "<user>",
  description: "Ban a user",
  execute(message, args) {
    if (!args.length) {
      return message.reply(`you didn't mention a user to ban!`);
    }
    if (message.member.hasPermission("BAN_MEMBERS")) {
      if (message.mentions.members.first()) {
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        if (member) {
          member
            .ban()
            .then((user) =>
              message.channel.send(
                `Banned ${user.username || user.id || user} from ${
                  message.guild.name
                }`
              )
            )
            .catch((error) => message.channel.send(`Error: ${error}`));
        }
      } else {
        message.guild.members
          .ban(`${args}`)
          .then((user) =>
            message.channel.send(
              `Banned ${user.username || user.id || user} from ${
                message.guild.name
              }`
            )
          )
          .catch((error) => message.channel.send(`Error: ${error}`));
      }
    } else {
      message.reply(`you do not have permissions to use this command!`);
    }
  },
};
