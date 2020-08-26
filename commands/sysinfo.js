module.exports = {
	name: 'sysinfo',
	description: 'Get the bot\'s system info',
	async execute(message) {
		const os = require('os');

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
		function getSystemInfo() {
			return {
				osPlatform: process.platform,
				osRelease: os.type() + ' ' + os.release(),
				architecture: os.arch(),
				totalMemoryMB: os.totalmem() / 1048576,
				numCores: os.cpus().length,
				bytesAvailable: os.freemem() / 1048576,
				cpus: os.cpus(),
				uptime: os.uptime(),
			};
		}
		const sysinfo = getSystemInfo();
		const uptime = (sysinfo.uptime + '').toHHMMSS();
		message.channel.send(
			`CPU Model: ${sysinfo.numCores} x ${
				sysinfo.cpus[0].model
			}\nServer Uptime: ${uptime}\nServer Kernel: ${
				sysinfo.osRelease
			}\nServer Memory: ${sysinfo.bytesAvailable.toFixed(
				2,
			)}MB/${sysinfo.totalMemoryMB.toFixed(2)}MB`,
		);
	},
};
