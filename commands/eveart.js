module.exports = {
	name: 'eveart',
	cooldown: 3,
	usage: '[Command only]',
	description: 'Random Eve art!',
	guildOnly: false,
	async execute(message) {
		const fs = require('fs');
		const files = fs.readdirSync('./content/evedrawings/');
		const chosenFile = files[Math.floor(Math.random() * files.length)];
		message.channel.send(`\`${chosenFile}\``, {
			files: [{
				attachment: `./content/evedrawings/${chosenFile}`,
			}],
		});
	},
};
