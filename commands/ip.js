module.exports = {
	name: 'ip',
	cooldown: 5,
	usage: '[Command only]',
	description: 'Send Minecraft IPs',
	guildOnly: true,
	enabled: true,
	async execute(message) {
		message.channel.send('**Survival Minecraft** (1.16.3) survival.asspoop.com\n**Creative Minecraft** (1.16.3) creative.asspoop.com');
	},
};