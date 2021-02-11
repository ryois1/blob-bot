function GetRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = {
	name: 'uwuwu',
	cooldown: 0,
	usage: '[Command only]',
	description: 'uwuwu',
	guildOnly: false,
	enabled: true,
	async execute(message) {
		const uw = '<:uw:778360087432527892>';
		const wuw = '<:wuw:778360087260823562>';
		const wu = '<:wu:778360087282188289>';
		let uwu = uw;
		uwu += wuw.repeat(GetRandomInt(2, 20));
		uwu += wu;
		message.channel.send(uwu);
	},
};
