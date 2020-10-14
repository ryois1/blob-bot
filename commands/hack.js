module.exports = {
	name: 'hack',
	description: 'hack somebody',
	async execute(message) {
		await message.channel.send('Hacking queeba');
	},
};
