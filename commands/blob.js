const fs = require('fs');
const files = fs.readdirSync('./content/blobs/');

module.exports = {
	name: 'blob',
	usage: '[Command only]',
	cooldown: 3,
	description: 'Random blob!',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message) {
		const chosenFile = files[Math.floor(Math.random() * files.length)];
		message.channel.send({
			files: [{
				attachment: `./content/blobs/${chosenFile}`,
			}],
		});
	},
};
