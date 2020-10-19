module.exports = {
	name: 'avatar',
	usage: '<user>',
	cooldown: 3,
	description: 'Get user avatar',
	async execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(
				`Your avatar: <${message.author.displayAvatarURL({
					format: 'png',
					dynamic: true,
				})}>`,
			);
		}
		const avatarList = message.mentions.users.map((user) => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({
				format: 'png',
				dynamic: true,
				size: 4096,
			})}>`;
		});
		message.channel.send(avatarList);
	},
};
