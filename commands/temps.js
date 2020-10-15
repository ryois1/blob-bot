module.exports = {
	name: 'temps',
	description: 'Celsius to Fahrenheit and vice versa',
	async execute(message, args) {
        var unitFrom = args[0];
        var from = args[1];
        if(unitFrom == "c"){
            var cToFahr = from * 9 / 5 + 32;
            var output = from+'\xB0C is ' + cToFahr.toFixed(2) + ' \xB0F.';
            message.reply(output);
        }
        if(unitFrom == "C"){
            var cToFahr = from * 9 / 5 + 32;
            var output = from+'\xB0C is ' + cToFahr.toFixed(2) + ' \xB0F.';
            message.reply(output);
        }
        if(unitFrom == "f"){
            var fToCel = (from - 32) * 5 / 9;
            var output = from+'\xB0F is ' + fToCel.toFixed(2) + '\xB0C.';
            message.reply(output);
        }
        if(unitFrom == "F"){
            var fToCel = (from - 32) * 5 / 9;
            var output = from+'\xB0F is ' + fToCel.toFixed(2) + '\xB0C.';
            message.reply(output);
        }
	},
};
