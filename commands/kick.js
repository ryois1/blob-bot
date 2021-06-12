module.exports = {
	name: 'kick',
	cooldown: 1,
	usage: '<user>',
	description: 'Kick a member',
	guildOnly: true,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	execute(message, args, client, token, config, logger) {
		if (!args.length) {
			return message.reply('you didn\'t mention anyone to kick.') .then(msg => {
				msg.delete({ timeout: 1500 });
				message.delete({ timeout: 1500 });
			});
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
						.catch((error) => {
							logger.error(client, error);
							message.channel.send(`Error: ${error}`);
						});
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
