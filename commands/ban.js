module.exports = {
	name: 'ban',
	usage: '<user>',
	cooldown: 1,
	description: 'Ban a user',
	guildOnly: true,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	execute(message, args, client, token, config, logger) {
		if (!args.length) {
			return message.reply('you didn\'t mention a user to ban.') .then(msg => {
				msg.delete({ timeout: 1500 });
				message.delete({ timeout: 1500 });
			});
		}
		if (message.member.hasPermission('BAN_MEMBERS')) {
			if (message.mentions.members.first()) {
				const user = message.mentions.users.first();
				const member = message.guild.member(user);
				if (member) {
					member
						.ban()
						.then(() =>
							message.channel.send(
								`Banned ${user.username || user.id || user} from ${
									message.guild.name
								}`,
							),
						)
						.catch((error) => {
							logger.error(client, error);
							message.channel.send(`Error: ${error}`);
						});
				}
			}
			else {
				message.guild.members
					.ban(`${args}`)
					.then((user) =>
						message.channel.send(
							`Banned ${user.username || user.id || user} from ${
								message.guild.name
							}`,
						),
					)
					.catch((error) => {
						logger.error(client, error);
						message.channel.send(`Error: ${error}`);
					});
			}
		}
		else {
			message.reply('you do not have permission to use this command.') .then(msg => {
				msg.delete({ timeout: 1500 });
				message.delete({ timeout: 1500 });
			});
		}
	},
};
