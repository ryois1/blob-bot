module.exports = {
	name: 'butt',
	usage: '[Command only]',
	cooldown: 3,
	aliases: ['butts'],
	description: 'Butt',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message) {
		message.channel.send('<a:buttrave:765594101675851817>');
	},
};