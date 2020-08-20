module.exports = {
  name: "fuckoff",
  aliases: ["foaas"],
  description: "FOaaS",
  async execute(message) {
    const Discord = require("discord.js");
    const attachment = new Discord.MessageAttachment("./content/fuckoff.gif");
    message.channel.send(`${message.author},`, attachment);
  },
};
