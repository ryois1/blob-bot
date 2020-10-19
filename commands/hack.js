module.exports = {
	name: 'hack',
	cooldown: 1,
	usage: '<user>',
	description: 'hack somebody',
	async execute(message) {
		await message.channel.send('Hacking queeba');
	},
};
