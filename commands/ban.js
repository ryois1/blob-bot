module.exports = {
  name: 'ban',
  usage: '<user>',
	description: 'Ban a user',
	execute(message, args) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
      message.guild.members
        .ban(`${args}`)
        .then((user) => message.channel.send(`Banned ${user.username || user.id || user} from ${message.guild.name}`))
        .catch(error => message.channel.send(`Error: ${error}`));
        } else {
          message.reply("You do not have permissions to use this command");
      }
    },
};