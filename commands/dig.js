const dig = require('node-dig-dns');
const Discord = require('discord.js');
module.exports = {
	name: 'dig',
	cooldown: 3,
	usage: '[Domain] [DNS Server] [Record Type]',
	aliases: ['nslookup'],
	description: 'DNS Lookup',
	guildOnly: false,
	enabled: true,
	async execute(message, args, client, token, config, logger) {
		if (args == 0) {
			return message.reply('Please provide a query');
		}
		const lookup = args[0];
		const dns_server = args[1];
		let record_type = args[2];
		const dns_servers = new Map([
			['@cloudflare', '@1.1.1.1'],
			['@google', '@8.8.8.8'],
			['@opendns', '@208.67.222.222'],
			['@quad9', '@9.9.9.9'],
			[undefined, '@1.1.1.1'],
		]);
		const status_colors = new Map([
			['failure', '#ff3838'],
			['success', '#56f000'],
			['nxdomain', '#ffb302'],
		]);
		if(record_type == null) {
			record_type = 'A';
		}
		const use_dns_server = dns_servers.get(dns_server);
		dig([use_dns_server, lookup, record_type])
			.then((result) => {
				if(result.answer == null) {
					const errorEmbed = new Discord.MessageEmbed()
						.setColor(status_colors.get('nxdomain'))
						.setTitle('Error `dig`ing')
						.setDescription('There was an error looking up that domain. No records returned')
						.setTimestamp()
						.setFooter('Blob Bot');
					message.channel.send(errorEmbed);
				}
				else{
					const errorEmbed = new Discord.MessageEmbed()
						.setColor(status_colors.get('success'))
						.setTitle('`dig` Result')
						.setDescription(`Here are the ${record_type} records for ${lookup} using ${use_dns_server}`)
						.setTimestamp()
						.setFooter('Blob Bot');
					for (const ans of result.answer) {
						errorEmbed.addField(ans.domain, ans.value, true);
					}
					message.channel.send(errorEmbed);
				}
			})
			.catch((err) => {
				logger.error(client, 'Error: ' + err);
				const errorEmbed = new Discord.MessageEmbed()
					.setColor(status_colors.get('failure'))
					.setTitle('Error `dig`ing')
					.setDescription('There was an error looking up that domain.')
					.setTimestamp()
					.setFooter('Blob Bot');

				message.channel.send(errorEmbed);
			});
	},
};
