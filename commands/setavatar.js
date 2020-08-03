module.exports = {
	name: 'setavatar',
	description: 'Set the bot\'s avatar',
	async execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            client.user.setAvatar(`${args}`)
                .then(user => message.channel.send(`Changed avatar of bot`))
                .catch(error => message.channel.send(`Error: ${error}`));
          } else {
            message.reply("You do not have permissions to use this command");
        }
	},
};