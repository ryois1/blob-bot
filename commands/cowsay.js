const cowsay = require('cowsay');

module.exports = {
	name: 'cowsay',
	cooldown: 3,
	usage: '[Message]',
	description: 'Cowsay!',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message, args) {
		let cowsayin = args.join(' ');
		cowsayin = cowsayin.replace(/[^a-zA-Z0-9,.!:?/ ]/g, '');
		if(cowsayin.length > 0 && cowsayin.length < 1376) {
			const cowsayout = cowsay.say({ text: cowsayin });
			message.channel.send(`\`\`\`${cowsayout}\`\`\``);
		}
		else{
			const cowsayout = cowsay.say({ text: 'The cow did not like that message. (it was either too large or nothing was sent)' });
			message.channel.send(`\`\`\`${cowsayout}\`\`\``);
		}
	},
};
