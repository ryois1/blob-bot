module.exports = {
	name: 'namecolor',
	cooldown: 5,
	usage: '<hex color>',
	aliases: ['namecolour'],
	description: 'Specify a hex color for your name!',
	guildOnly: true,
	enabled: true,
	allowedGuilds: ['765292849767120897', '851802737662099456'],
	execute(message, args, client, token, config, logger) {
		if (!args.length) {
			return message.reply('you didn\'t give me a hex color!');
		}
		const guild = message.guild;
		const roleName = `${message.author.id}`;
		const role = message.guild.roles.cache.find(x => x.name == roleName);
		if(!role) {
			try {
				guild.roles.create({
					data:{
						name:`${message.author.id}`,
						color:`${args}`,
					},
				}).then((userRole) => message.member.roles.add(userRole))
					.catch((error) => {
						logger.error(client, error);
						message.channel.send(`Error: ${error}`);
					});
			}
			catch (error) {
				logger.error(client, error);
				message.channel.send(`Error: ${error}`);
			}
		}
		else {
			role.edit({
				color: `${args}`,
			});
		}
		message.reply(`Changed your name's color to ${args}!`);
	},
};