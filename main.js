/* eslint-disable no-mixed-spaces-and-tabs */
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./private/config.json');
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
    client.commands.find(
    	(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
    );
	if (!command) return;
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}
	try {
		command.execute(message, args, client, token);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


// Start logger

client.login(token);
client.once('ready', () => {
	console.log('Started blob bot!');
	console.log(`In ${client.guilds.cache.size} servers`);
	setInterval(function() {client.user.setActivity(`over ${client.guilds.cache.size} servers`, { type: 'WATCHING' });}, 30000);


});