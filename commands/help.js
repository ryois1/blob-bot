module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '<command name>',
	cooldown: 1,
	guildOnly: false,
	enabled: true,
	execute(message, args, client, token, config, logger) {
		const prefix = '!';
		const data = [];
		const { commands } = message.client;
		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(
				commands
					.map((command) => `**${command.name}**: usage: \`${command.usage}\``)
					.join('\n'),
			);
			data.push(
				'\nYou can send `!help [command name]` to get info on a specific command!',
			);
			return message.channel.send(data, { split: true }).catch((error) => {
				logger.error(client, error);
				message.reply('There was an error showing my commands.');
			});
		}
		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));
		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
		data.push(`**Name:** ${command.name}`);
		if (command.aliases) { data.push(`**Aliases:** ${command.aliases.join(', ')}`); }
		if (command.description) { data.push(`**Description:** ${command.description}`); }
		if (command.usage) { data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`); }
		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		message.channel.send(data, { split: true });
	},
};
