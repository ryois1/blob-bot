const WolframAlphaAPI = require('wolfram-alpha-api');
const Discord = require('discord.js');

module.exports = {
	name: 'wolframalpha',
	cooldown: 3,
	usage: '[query]',
	aliases: ['wa', 'alpha'],
	description: 'Wolfram Alpha',
	guildOnly: false,
	enabled: true,
	async execute(message, args, client, token, config, logger) {
		const waApi = WolframAlphaAPI(`${config.WOLFRAM_ALPHA_API_KEY}`);
		const query = args.join(' ');
		const m = await message.channel.send('Getting answer from Wolfram Alpha... <a:loading:766090429799858196>');
		waApi.getSimple(`${query}`)
			.then(result => {
				const imageStream = Buffer.from(result.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
				const attachment = new Discord.MessageAttachment(imageStream);
				message.channel.send(attachment);
				m.delete();
			})
			.catch(error => {
				m.edit(`${error}`);
				logger.error(client, error);
			});
	},
};
