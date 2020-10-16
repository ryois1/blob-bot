module.exports = {
	name: 'hack',
	usage: '<user>',
	description: 'hack somebody',
	async execute(message) {
		await message.channel.send('Hacking queeba');
	},
};
