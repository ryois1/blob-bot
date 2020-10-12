module.exports = {
	name: 'namecolor',
	description: 'Specify a hex color for your name!',
	execute(message, args) {
        let guild = message.guild;
        let roleName = `${message.author.id}`;
        let role = message.guild.roles.cache.find(x => x.name == roleName);
        if(!role) {
            try {
                guild.roles.create({
                    data:{
                    name:`${message.author.id}`,
                    color:`${args}`,
                }
            }).then((role) => message.member.roles.add(role)).catch(console.error);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            role.edit({
                color: `${args}`
            })
        }

        message.reply(`Changed your name's color to ${args}!`);
	},
};