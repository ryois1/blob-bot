module.exports = {
	name: 'blob',
	description: 'Random blob!',
	async execute(message) {
		const fs = require('fs');
		var files = fs.readdirSync('./content/blobs/')
		let chosenFile = files[Math.floor(Math.random() * files.length)] 
		message.channel.send({
			files: [{
				attachment: `/root/blob-bot/content/blobs/${chosenFile}`
			  }]
		})
	},
};
