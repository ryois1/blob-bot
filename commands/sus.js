module.exports = {
	name: 'sus',
	description: 'Yellow sus',
	async execute(message) {
        let sus = message.guild.members.cache.random().user;
            var phrases = Array(`byeeee ${sus.username}#${sus.discriminator}`, `I saw ${sus.username}#${sus.discriminator} vent`, `${sus.username}#${sus.discriminator} sus`, `${sus.username}#${sus.discriminator}: I'm not the impostor, u really think my fat juicy ass could fit through the vent?`);
            var susmessage = phrases[Math.floor(Math.random() * phrases.length)];
            message.channel.send(`${susmessage}`);
        }
	};