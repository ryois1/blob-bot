module.exports = {
  name: 'sysinfo',
  description: 'Get the bot\'s system info',
  async execute(message) {
    const os = require('os');

    String.prototype.toHHMMSS = function () {
      var seconds = parseInt(this, 10); // don't forget the second param
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);
      var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
      var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
      var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
      var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
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
    sysinfo = getSystemInfo();
    var uptime = (sysinfo.uptime + '').toHHMMSS();
    message.channel.send(
      `CPU Model: ${sysinfo.numCores} x ${
        sysinfo.cpus[0].model
      }\nServer Uptime: ${uptime}\nServer Kernel: ${
        sysinfo.osRelease
      }\nServer Memory: ${sysinfo.bytesAvailable.toFixed(
        2
      )}MB/${sysinfo.totalMemoryMB.toFixed(2)}MB`
    );
  },
};
