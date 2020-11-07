/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
	name: 'reload',
	cooldown: 2,
	usage: '<command>',
	description: 'Reloads a command',
	guildOnly: false,
	execute(message, args) {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			if (!args.length) {
				return message.reply(
					'you didn\'t pass any command to reload!',
				);
			}
			const commandName = args[0].toLowerCase();
			const command =
        message.client.commands.get(commandName) ||
        message.client.commands.find(
        	(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
        );
			if (!command) {
				return message.reply(
					`there is no command with name or alias \`${commandName}\`!`,
				);
			}
			delete require.cache[require.resolve(`./${command.name}.js`)];
			try {
				const newCommand = require(`./${command.name}.js`);
				message.client.commands.set(newCommand.name, newCommand);
			}
			catch (error) {
				console.log(error);
				message.reply(`there was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
			}
			message.reply(`Command \`${command.name}\` was reloaded!`) .then(msg => {
				msg.delete({ timeout: 1500 });
				message.delete({ timeout: 1500 });
			});
		}
		else {
			message.reply('you do not have permission to use this command.') .then(msg => {
				msg.delete({ timeout: 1500 });
				message.delete({ timeout: 1500 });
			});
		}
	},
};
