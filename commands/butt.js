module.exports = {
	name: 'butt',
	usage: '[Command only]',
	cooldown: 3,
	aliases: ['butts'],
	description: 'Butt',
	guildOnly: false,
	enabled: true,
	async execute(message) {
		message.channel.send('<a:buttrave:765594101675851817>');
	},
};