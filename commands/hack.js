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
		const hacking_message = await message.channel.send('Hacking queeba');
		let loop_count = 0;
		while (loop_count < 120) {
			if (loop_count == 80) {
				hacking_message.edit(
					'Hacking queeba... 99% done.',
				);
			}
			else{
				hacking_message.edit(
					`Hacking queeba... ${loop_count}% done.`,
				);
			}
			loop_count += 20;
			if (loop_count == 120) {
				hacking_message.edit(
					'Hacked queeba.',
				);
				break;
			}
		}
	},
};
