/* eslint-disable no-irregular-whitespace */
module.exports = {
	name: 'sus',
	cooldown: 0.5,
	usage: '[Command only]',
	description: 'Yellow sus',
	async execute(message) {
		const sus = message.guild.members.cache.random().user;
		const phrases = Array(`\`\`\` 　.　　      。　        ඞ   。　    .    •\n   •         ${sus.username} was not an Impostor.     .　 。　.\n　 　　。　　 2 Impostors remains.　　.　 。\`\`\``, `\`\`\` 　.　　      。　        ඞ   。　    .    •\n   •         ${sus.username} was The Impostor.     .　 。　.\n　 　　。　　 1 Impostor remains.　　.　 。\`\`\``, `\`\`\` 　.　　      。　        ඞ   。　    .    •\n   •         ${sus.username} was The Impostor.     .　 。　.\n　 　　。　　 0 Impostors remain.　　.　 。\`\`\``, `${sus.username} was faking their tasks`, `${sus.username}: I was doing lights`, `byeeee ${sus.username}`, `I saw ${sus.username} vent`, `${sus.username} sus`, `${sus.username}: I'm not the impostor, u really think my fat juicy ass could fit through the vent?`);
		const susmessage = phrases[Math.floor(Math.random() * phrases.length)];
		message.channel.send(susmessage);
	},
};