module.exports = {
	name: 'emojis',
	cooldown: 3,
	description: 'List emojis',
	async execute(message) {
		const emojiList = message.guild.emojis.cache.map((emoji, id) => (`\`${id}\`` + ' = ' + emoji.toString()) + ' | ' + emoji.name).join('\n');
		message.channel.send(emojiList);
	},
};
