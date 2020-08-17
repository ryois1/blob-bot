module.exports = {
    name: "fuckoff",
    aliases: ['foaas'],
    description: "FOaaS",
    async execute(message, args, client, token) {
        const Discord = require('discord.js');
        const attachment = new Discord.MessageAttachment('./content/fuckoff.gif');
        message.channel.send(`${message.author},`, attachment);
    },
};