const fs = require('fs');
const Discord = require('discord.js');
const config = require('./private/config.json');
const logger = require('./modules/logger');
const prefix = config.prefix;
const token = config.token;
const gitlab = process.env.GITLAB;
const client = new Discord.Client();
client.commands = new Discord.Collection();
if(gitlab) {
	console.log('Success!');
	process.exit();
}
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command =
	client.commands.get(commandName) ||
	client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName),
	);

	if (!command) return;
	if (!command.enabled) {
		return message.reply('that command is disabled.') .then(msg => {
			msg.delete({ timeout: 2500 });
			message.delete({ timeout: 2500 });
		});
	}
	if(command.allowedGuilds) {
		if (!command.allowedGuilds.includes(`${message.guild.id}`)) {
			return message.reply('that command is disabled in this guild.') .then(msg => {
				msg.delete({ timeout: 2500 });
				message.delete({ timeout: 2500 });
			});
		}
	}
	if(command.ownerOnly) {
		if (message.author.id != '236237361703288842') {
			return message.reply('that command is only available to the owner.') .then(msg => {
				msg.delete({ timeout: 2500 });
				message.delete({ timeout: 2500 });
			});
		}
	}
	if (command.args && !args.length) {
		return message.reply(`that command requires some arguments... ${prefix}${command.name} ${command.usage}`);
	}
	try {
		command.execute(message, args, client, token, config, logger);
	}
	catch (error) {
		logger.error(client, error);
		message.reply('there was an error trying to execute that command!');
	}
});
client.login(token);
client.once('ready', () => {
	logger.log(client, 'Started blob bot!');
	logger.log(client, `blob bot is in ${client.guilds.cache.size} servers`);
	client.user.setActivity(`over ${client.guilds.cache.size} servers`, { type: 'WATCHING' });
});