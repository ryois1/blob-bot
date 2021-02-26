/* eslint-disable max-nested-callbacks */
const TikTokScraper = require('tiktok-scraper');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const fs = require('fs');

module.exports = {
	name: 'tiktok',
	cooldown: 3,
	usage: 'Subcommands: download [tiktok URL]',
	description: 'TikTok Downloader',
	guildOnly: false,
	enabled: false,
	async execute(message, args, client, token, config, logger) {
		async function downloadTikTok(url, filename) {
			const writer = fs.createWriteStream(`./content/${filename}`);
			const response = await axios({
				url,
				method: 'GET',
				responseType: 'stream',
				headers: {
					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
					referer: 'https://www.tiktok.com/',
					Cookie: 'tt_webid_v2=6926313276008547846; sid_tt=37f203d0a89dfe5eaa55d961bcbf47a4',
				},
			});
			response.data.pipe(writer);
			return new Promise((resolve, reject) => {
				writer.on('finish', resolve(response));
				writer.on('error', reject);
			});
		}
		const sub_command = args[0];
		if (sub_command == 'download') {
			const m = await message.channel.send(`Downloading video, please wait... ${config.LOADING_EMOJI}`);
			const regex = /https:\/\/www.tiktok.com\/((.*)\/video\/(.*))|https:\/\/vm.tiktok.com\/([0-9a-zA-Z]{9})\//g;
			const options = {
				number: 2,
				proxy: '',
				sessionList: ['sid_tt=37f203d0a89dfe5eaa55d961bcbf47a4'],
				by_user_id: false,
				asyncDownload: 5,
				asyncScraping: 3,
				filetype: 'na',
				headers: {
					'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
					referer: 'https://www.tiktok.com/',
					cookie: 'tt_webid_v2=6926313276008547846',
				},
				hdVideo: true,
			};
			args.shift();
			const url = args.join(' ');
			if(regex.test(url)) {
				(async () => {
					try {
						const videoMeta = await TikTokScraper.getVideoMeta(url, options);
						console.log(videoMeta);
						const uuid = uuidv4();
						const filename = encodeURI(`tiktok-${uuid}.mp4`);
						await downloadTikTok(videoMeta.collector[0].videoUrl, filename)
							.then(async function() {
								message.channel.send('TikTok Video', {
									files: [{
										attachment: `./content/${filename}`,
									}],
								});
							});
					}
					catch (error) {
						m.edit('Failed to get video info');
						logger.error(client, error);
					}
				})();
			}
			else{
				m.edit('Invalid TikTok URL');
			}
		}
	},
};
