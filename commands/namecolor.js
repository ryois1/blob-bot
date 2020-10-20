module.exports = {
	name: 'namecolor',
	cooldown: 5,
	usage: '<hex color>',
	aliases: ['namecolour'],
	description: 'Specify a hex color for your name!',
	execute(message, args) {
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
				}).then((userRole) => message.member.roles.add(userRole)).catch(console.error);
			}
			catch (error) {
				console.log(error);
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