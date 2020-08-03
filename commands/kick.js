module.exports = {
	name: 'kick',
	description: 'Kick a member',
	async execute(message) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            message.guild.members;
            const user = message.mentions.users.first();
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick()
                    .then((user) => message.channel.send(`Kicked ${user.username || user.id || user} from ${message.guild.name}`))
                    .catch(error => message.channel.send(`Error: ${error}`));
            } else{
                message.channel.send("That user cannot be found");
            }
        } else {
            message.reply("You do not have permissions to use this command");
        }
	},
};