module.exports = {
	name: 'ping',
	cooldown: 3,
	usage: '[Command only]',
	description: 'Ping!',
	guildOnly: false,
	enabled: true,
	async execute(message) {
		const m = await message.channel.send('Ping?');
		m.edit(
			`Pong 🏓! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`,
		);
	},
};
