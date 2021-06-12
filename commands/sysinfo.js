const si = require('systeminformation');
const moment = require('moment');
const prettyBytes = require('pretty-bytes');
module.exports = {
	name: 'sysinfo',
	cooldown: 10,
	usage: '[Command only]',
	description: 'Get the bot\'s system info',
	guildOnly: false,
	enabled: true,
	disabledGuilds: ['851802737662099456'],
	execute(message, args, client, token, config, logger) {
		const outputMessage = [];
		String.prototype.toHHMMSS = function() {
			let seconds = parseInt(this, 10);
			seconds = Number(seconds);
			const d = Math.floor(seconds / (3600 * 24));
			const h = Math.floor((seconds % (3600 * 24)) / 3600);
			const m = Math.floor((seconds % 3600) / 60);
			const s = Math.floor(seconds % 60);
			const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
			const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
			const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
			const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
			return dDisplay + hDisplay + mDisplay + sDisplay;
		};
		const timeData = si.time();
		const now = Math.round(Date.now() / 1000);
		const serverUptime = timeData.uptime;
		const humanUptime = (serverUptime + '').toHHMMSS();
		outputMessage.push(`**Uptime:** ${humanUptime}`);
		outputMessage.push(`**Server Time:** ${moment.unix(now).format('M/d/YYYY, h:mm:ss A')} (Timezone: ${timeData.timezoneName})`);
		si.cpu()
			.then(data => {
				outputMessage.push(`**CPU:** ${data.manufacturer} ${data.brand} @ ${data.speed}GHz (Sockets: ${data.processors}, Cores: ${data.cores})`);
				si.mem()
					.then(memData => {
						outputMessage.push(`**RAM:** ${prettyBytes(memData.total)} Used ${prettyBytes(memData.used)} Free ${prettyBytes(memData.free)} (Swap Total: ${prettyBytes(memData.swaptotal)}, Swap Used: ${prettyBytes(memData.swapused)})`);
						si.osInfo()
							.then(osData => {
								outputMessage.push(`**OS:** ${osData.distro} ${osData.release} (Kernel: ${osData.kernel})`);
								message.channel.send(outputMessage, { split: true });
							})
							.catch(error => logger.error(client, error));
					})
					.catch(error => logger.error(client, error));
			})
			.catch(error => logger.error(client, error));
	},
};
