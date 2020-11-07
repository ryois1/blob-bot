module.exports = {
	name: 'hack',
	cooldown: 1,
	usage: '<user>',
	description: 'hack somebody',
	guildOnly: true,
	async execute(message, args) {
		if (!args.length) {
			return message.reply('you didn\'t name anyone for me to hack!');
		}
		await message.channel.send('Hacking queeba');
	},
};
