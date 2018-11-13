const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	if(!args[1]) return msg.channel.send("Please Ask A Question");
	let replies = ["Yes", "No", "Not Sure", "Ask Again", "100%", "NO!!!!!"];

	let answer = Math.floor((Math.random() * replies.length));
	let question = args.slice(1).join(" ");

	msg.channel.send(`🎱 ${replies[answer]}`);
};

module.exports.help = {
	name: "8ball"
}
