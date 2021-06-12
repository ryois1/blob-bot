const fs = require('fs');

module.exports = {
	name: 'eveart',
	cooldown: 3,
	usage: '[Command only]',
	description: 'Random Eve art!',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message) {
		const files = fs.readdirSync('./content/evedrawings/');
		const chosenFile = files[Math.floor(Math.random() * files.length)];
		message.channel.send(`\`${chosenFile}\``, {
			files: [{
				attachment: `./content/evedrawings/${chosenFile}`,
			}],
		});
	},
};
