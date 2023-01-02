const fs = require('node:fs');

module.exports = async (directory, client) => {
	const eventsFolders = fs.readdirSync(directory);
	for (const folder of eventsFolders) {
		const files = fs.readdirSync(`${directory}/${folder}`);
		for (const file of files) {
			const event = require(`${directory}/${folder}/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			}
			else {
				client.on(event.name, (...args) => event.execute(...args, client));
			}
		}
	}
};