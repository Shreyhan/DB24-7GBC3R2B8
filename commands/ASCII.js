const Discord = require("discord.js");
const figlet = require('figlet');

module.exports.run = async (bot, message, args) => {
	if (!args.join(' ')) return msg.channel.send("provide TEXT");
	figlet(args.join(' '), (err, data) => {
		msg.channel.send(data, {
			code: 'ascii'
		});
	});
};

module.exports.help = {
	name: "ascii"
}
