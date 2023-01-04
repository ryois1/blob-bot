const { Command, EmbedResponse } = require('@src/structures');
const os = require('os');
const { outdent } = require('outdent');

module.exports = class Sats extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			description: 'Get bot stats',
			globallyEnabled: true,
			category: 'utility',
			slashCommand: {
				enabled: true,
			},
		});
	}
	async execute(interaction) {
		const client = interaction.client;

		// STATS
		const guilds = client.guilds.cache.size;
		const channels = client.channels.cache.size;
		const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);

		// CPU
		const platform = process.platform.replace(/win32/g, 'Windows');
		const architecture = os.arch();
		const cores = os.cpus().length;
		const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

		// RAM
		const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
		const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
		const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

		const overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
		const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
		const overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;

		Object.prototype.toHHMMSS = function() {
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
		const procUptime = process.uptime().toHHMMSS();
		const uptime = os.uptime().toHHMMSS();
		const responseData = {
			title: 'Blob Bot Stats',
			author: { name: 'Blob Bot#8935', iconURL: 'https://cdn.discordapp.com/emojis/561634094211923978.png' },
			fields: [{ name: 'Total Members', value: String(users), inline: true },
				{ name: 'Total Channels', value: String(channels), inline: true },
				{ name: 'Total Servers', value: String(guilds), inline: true },
				{ name: 'CPU', value:  outdent`
				❯ **OS:** ${platform} [${architecture}]
				❯ **Cores:** ${cores}
				❯ **Usage:** ${cpuUsage}
				`, inline: true },
				{ name: 'Bot RAM', value: outdent`
				❯ **Used:** ${botUsed}
				❯ **Available:** ${botAvailable}
				❯ **Usage:** ${botUsage}
				`, inline: true },
				{ name: 'System RAM', value: outdent`
				❯ **Used:** ${overallUsed}
				❯ **Available:** ${overallAvailable}
				❯ **Usage:** ${overallUsage}
				`, inline: true },
				{ name: 'Node.js Version', value: process.versions.node, inline: true },
				{ name: 'Server Uptime', value: uptime, inline: true },
				{ name: 'Bot Uptime', value: procUptime, inline: true },

			],
			footer: { text: 'Proudly hosted on BWS', iconURL: 'https://cdn.discordapp.com/emojis/561634094211923978.png' },
		};
		const response = new EmbedResponse(responseData, interaction.client);
		await interaction.reply({ embeds: [response.build()] });
	}
};