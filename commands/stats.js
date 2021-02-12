module.exports = {
	name: 'stats',
	cooldown: 3,
	usage: '[Command only]',
	description: 'Get bot stats',
	guildOnly: false,
	enabled: true,
	async execute(message, args, client, token, config) {
		const os = require('os');
		function getSystemInfo() {
			return {
				uptime: os.uptime(),
			};
		}
		function format(seconds) {
			function pad(s) {
				return (s < 10 ? '0' : '') + s;
			}
			const hours = Math.floor(seconds / (60 * 60));
			const minutes = Math.floor(seconds % (60 * 60) / 60);
			seconds = Math.floor(seconds % 60);

			return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
		}
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
		const sysinfo = getSystemInfo();
		const procUptime = process.uptime();
		const uptime = (sysinfo.uptime + '').toHHMMSS();
		const Discord = require('discord.js');
		const botMsg = await message.channel.send(`Getting stats... ${config.LOADING_EMOJI}`);
		const outputEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Blob Bot Stats')
			.setAuthor('Blob Bot#8935', 'https://cdn.discordapp.com/emojis/561634094211923978.png', 'https://ryois.me')
			.addFields(
				{ name: 'Total Members', value: client.users.cache.size, inline: true },
				{ name: 'Total Channels', value: client.channels.cache.size, inline: true },
				{ name: 'Total Servers', value: client.guilds.cache.size, inline: true },
			)
			.addFields(
				{ name: 'Server Uptime', value: uptime, inline: true },
				{ name: 'Bot Uptime', value: format(procUptime), inline: true },
				{ name: 'Ping', value: botMsg.createdTimestamp - message.createdTimestamp + 'ms', inline: true },
			)
			.setTimestamp()
			.setFooter('Proudly hosted on BWS', 'https://cdn.discordapp.com/emojis/561634094211923978.png');
		botMsg.edit('Got stats');
		botMsg.edit(outputEmbed).catch(() => botMsg.edit('🆘 An unknown error occurred. Do I have permission? (Embed Links)'));
	},
};