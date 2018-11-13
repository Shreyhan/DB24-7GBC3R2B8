const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let replies = ["100%", "19%", "1%", "45%"];

	let answer = Math.floor((Math.random() * replies.length));
	let question = args.slice(1).join(" ");

	msg.channel.send(`${replies[answer]} gay`);
};

module.exports.help = {
	name: "howgay"
}