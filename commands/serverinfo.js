module.exports = {
	name: 'serverinfo',
	usage: '[Command Only]',
	cooldown: 3,
	description: 'Get the info of the current server',
	guildOnly: true,
	async execute(message) {
		const Discord = require('discord.js');
		function checkDays(date) {
			const now = new Date();
			const diff = now.getTime() - date.getTime();
			const days = Math.floor(diff / 86400000);
			return days + (days == 1 ? ' day' : ' days') + ' ago';
		}
		const verifLevels = { 'NONE': 'NONE', 'LOW': 'Low', 'MEDIUM': 'Medium', 'HIGH': '(╯°□°）╯︵  ┻━┻', 'VERY_HIGH': '┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻' };
		const region = {
			'brazil': ':flag_br: Brazil',
			'eu-central': ':flag_eu: Central Europe',
			'singapore': ':flag_sg: Singapore',
			'us-central': ':flag_us: U.S. Central',
			'sydney': ':flag_au: Sydney',
			'us-east': ':flag_us: U.S. East',
			'us-south': ':flag_us: U.S. South',
			'us-west': ':flag_us: U.S. West',
			'eu-west': ':flag_eu: Western Europe',
			'vip-us-east': ':flag_us: VIP U.S. East',
			'london': ':flag_gb: London',
			'amsterdam': ':flag_nl: Amsterdam',
			'hongkong': ':flag_hk: Hong Kong',
			'russia': ':flag_ru: Russia',
			'southafrica': ':flag_za:  South Africa',
		};
		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Server Info')
			.setThumbnail(message.guild.iconURL())
			.setDescription(`${message.guild}'s information`)
			.addField('Owner', `The owner of this server is ${message.guild.owner}`, true)
			.addField('Region', region[message.guild.region], true)
			.addField('Total | Humans | Bots', `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
			.addField('Emoji Count', `This server has ${message.guild.emojis.cache.size} emojis`, true)
			.addField('Roles Count', `This server has ${message.guild.roles.cache.size} roles`, true)
			.addField('Verification Level', verifLevels[message.guild.verificationLevel], true)
			.addField('Creation Date', `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true);
		message.channel.send(embed);
	},
};

