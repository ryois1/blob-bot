module.exports = {
	name: 'blob',
	description: 'Random blob!',
	async execute(message) {
		const fs = require('fs');
		const files = fs.readdirSync('./content/blobs/');
		const chosenFile = files[Math.floor(Math.random() * files.length)];
		message.channel.send({
			files: [{
				attachment: `/root/blob-bot/content/blobs/${chosenFile}`,
			}],
		});
	},
};