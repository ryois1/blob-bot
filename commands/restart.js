module.exports = {
    name: "restart",
    aliases: ['reboot'],
    description: "Restarts the bot",
    async execute(message, args, client, token) {
        console.log("RESTARTED BOT")
        message.reply('Restarting the bot...')
        .then(message => client.destroy())
        .then(() => client.login(token));
    },
  };