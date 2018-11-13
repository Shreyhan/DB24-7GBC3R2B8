const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, msg, args) => {

	//h?warn @user reason
	let staffrole = msg.guild.roles.find("name", "Staff");
	if (!msg.member.roles.has(staffrole.id)) return msg.channel.send("You Cannot Clear Warns For People!");
	let wrUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
	if (!wrUser) msg.channel.send("Please Specify Who You Want To Clear Warns!");

  	if(!warns[wrUser.id]) warns[wUser.id] = {
    warns: 0
  	};

  	warns[wrUser.id].warns = 0;

  	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  	});
  	msg.channel.send(`Warns Have Been Cleared For ${wrUser}`)

}

module.exports.help = {
	name: "clearwarns"
}