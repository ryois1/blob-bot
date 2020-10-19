module.exports = {
	name: 'kick',
	cooldown: 1,
	usage: '<user>',
	description: 'Kick a member',
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t mention a user to kick!');
		}
		if (message.member.hasPermission('KICK_MEMBERS')) {
			if (message.mentions.members.first()) {
				const user = message.mentions.users.first();
				const member = message.guild.member(user);
				if (member) {
					member
						.kick()
						.then(() =>
							message.channel.send(
								`Kicked ${user.username || user.id || user} from ${
									message.guild.name
								}`,
							),
						)
						.catch((error) => message.channel.send(`Error: ${error}`));
				}
			}
			else {
				message.guild.members
					.kcik(`${args}`)
					.then((user) =>
						message.channel.send(
							`Kicked ${user.username || user.id || user} from ${
								message.guild.name
							}`,
						),
					)
					.catch((error) => message.channel.send(`Error: ${error}`));
			}
		}
		else {
			message.reply('you do not have permissions to use this command!');
		}
	},
};
