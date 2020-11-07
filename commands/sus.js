const { messages } = require('../content/sus_messages.json');

module.exports = {
	name: 'sus',
	cooldown: 0.5,
	usage: '[Command only]',
	description: 'Yellow sus',
	async execute(message) {
		const sus = message.guild.members.cache.random().user;
		const susmessage = messages[Math.floor(Math.random() * messages.length)]
			.slice(0)
			.replace('$username', sus.username)
        ;
		message.channel.send(susmessage);
	},
};