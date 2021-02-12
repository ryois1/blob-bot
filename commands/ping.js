module.exports = {
	name: 'ping',
	cooldown: 3,
	usage: '[Command only]',
	description: 'Ping!',
	guildOnly: false,
	enabled: true,
	async execute(message, args, client, token, config) {
		const m = await message.channel.send(config.LOADING_EMOJI);
		m.edit(
			`Pong 🏓! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`,
		);
	},
};
