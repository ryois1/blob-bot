module.exports = {
	name: 'eveart',
	description: 'Random Eve art!',
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
