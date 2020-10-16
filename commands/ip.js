module.exports = {
	name: 'ip',
	usage: '[Command only]',
	description: 'Send Minecraft IPs',
	async execute(message) {
		message.channel.send('**Creative Minecraft** (1.12.2) Custom Mod Pack creative-mc.blob.rocks\n**Survival Minecraft** (1.12.2) FTB Revelation survival-mc.blob.rocks\n**Vanilla Survival Minecraft** (1.16) mc.asspoop.com');
	},
};