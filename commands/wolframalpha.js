const WolframAlphaAPI = require('wolfram-alpha-api');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

module.exports = {
	name: 'wolframalpha',
	cooldown: 3,
	usage: '[query]',
	aliases: ['wa', 'alpha'],
	description: 'Wolfram Alpha',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	async execute(message, args, client, token, config, logger) {
		const waApi = WolframAlphaAPI(`${config.WOLFRAM_ALPHA_API_KEY}`);
		if(args == 0) {
			return message.reply('Please provide a query');
		}
		const query = args.join(' ');
		const m = await message.channel.send(`Getting answer from Wolfram Alpha... ${config.LOADING_EMOJI}`);
		waApi.getSimple(`${query}`)
			.then(result => {
				const uuid = uuidv4();
				const imageStream = Buffer.from(result.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
				const fileName = `./content/wolfram-alpha-${uuid}.jpg`;
				fs.writeFileSync(fileName, imageStream);
				const data = new FormData();
				data.append('image', fs.createReadStream(`${fileName}`));
				data.append('domain_intent', config.BLOB_IMAGE_HOSTING_DOMAIN);
				m.edit(`Got response, sending... ${config.LOADING_EMOJI}`);
				const uploadConfig = {
					method: 'post',
					url: config.BLOB_IMAGE_HOSTING_API_URL,
					headers: {
						'token': config.BLOB_IMAGE_HOSTING_API_KEY,
						...data.getHeaders(),
					},
					data : data,
				};
				axios(uploadConfig)
					.then(function(response) {
						if(response.data.error) {
							m.delete();
							fs.unlinkSync(fileName);
							return message.reply(`There was an error sending the result... ${response.data.error_message}`);
						}
						else{
							console.log(response);
							fs.unlinkSync(fileName);
							message.reply(response.data.url);
							m.delete();
						}
					})
					.catch(function(error) {
						console.log(error);
						fs.unlinkSync(fileName);
						return m.edit(`There was an error sending the result... ${error.response.data.error_message}`);
					});

			})
			.catch(error => {
				m.edit(`${error}`);
				logger.error(client, error);
			});
	},
};
