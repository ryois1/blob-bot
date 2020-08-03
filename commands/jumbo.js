module.exports = {
	name: 'jumbo',
	description: 'Wumbo an emoji!',
    async execute(message, args) {
        const https = require('https');
        const regexp = /<(a){0,1}:([A-Za-z0-9_.]+):([0-9]+)>/g;
        const matches = message.content.matchAll(regexp);
        for (const match of matches) {
            const emojiID = match[3];
            args.shift();
            const messageSend = args.join(' ');
            https.get(`https://cdn.discordapp.com/emojis/${emojiID}.gif?v=1`, function(res) {
            if (res.statusCode == 200){
                message.channel.send(`${messageSend}`, {files: [`https://cdn.discordapp.com/emojis/${emojiID}.gif?v=1`]})
            }else{
                https.get(`https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`, function(res) {
                    if (res.statusCode == 200){
                        message.channel.send(`${messageSend}`, {files: [`https://cdn.discordapp.com/emojis/${emojiID}.png?v=1`]})
                    }else{
                        message.reply(`This emoji is probably a Discord unicode emoji, these are not supported yet.`)
                }})
            }})
        }
	},
};