const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, msg, args) => {
	let wUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
	if(!wUser) return msg.channel.send("Who's Warns Do You Wanna Check?");
	if (!warns[wUser.id]) msg.channel.send(`${wUser} has 0 Warns`)
		else msg.channel.send(`<@${wUser.id}> has ${warns[wUser.id].warns} warnings.`)
};

module.exports.help = {
	name: "warns"
}
