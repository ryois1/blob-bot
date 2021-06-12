module.exports = {
	name: 'math',
	cooldown: 3,
	usage: '[math/LaTeX input]',
	description: 'Render math/LaTeX',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message, args) {
		const tex = args.join(' ');
		const url = 'http://chart.apis.google.com/chart?cht=tx&chs=100&&chl=' + encodeURIComponent(tex);
		await message.channel.send(url);
	},
};
