module.exports = {
	name: 'allusers',
	cooldown: 3,
	usage: 'N/A',
	description: 'All users',
	guildOnly: true,
	enabled: false,
	allowedGuilds: ['765292849767120897'],
	async execute(message, args, client) {
		const list = client.guilds.cache.get('765292849767120897');
		const data = [];
		const moment = require('moment');
		list.members.cache.forEach(member => data.push(`**Name:** ${member.user.tag}, **Created:** ${moment.utc(member.user.createdAt).format('dddd, MMMM Do YYYY')} `));
		message.channel.send(data, { split: true });
	},
};
