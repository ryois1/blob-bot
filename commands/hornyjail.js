module.exports = {
	name: 'hornyjail',
	usage: '<user>',
	cooldown: 1,
	description: 'Send a user to horny jail',
	guildOnly: true,
	enabled: true,
	allowedGuilds: ['765292849767120897'],
	execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t mention a user to send to horny jail.') .then(msg => {
				msg.delete({ timeout: 1500 });
				message.delete({ timeout: 1500 });
			});
		}
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
			if (message.mentions.members.first()) {
				const user = message.mentions.users.first();
				const member = message.guild.member(user);
				const role = message.guild.roles.cache.get('805590522051690547');
				member.roles
					.add(role)
					.then(message.reply(`Sent ${user.username || user.id || user} to horny jail.`))
					.catch(console.error);
			}
			else {
				const role = message.guild.roles.cache.get('805590522051690547');
				message.guild.members
					.add(role)
					.then((user) => message.reply(`Sent ${user.username || user.id || user} to horny jail.`))
					.catch(console.error);
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
