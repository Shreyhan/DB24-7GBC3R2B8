const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, msg, args) => {

	//h?warn @user reason
	let staffrole = msg.guild.roles.find("name", "Staff");
	if (!msg.member.roles.has(staffrole.id)) return msg.channel.send("You Cannot Warn People!");
	let wUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
	if (!wUser) msg.channel.send("Please Specify Who You Want To Warn!");
	let wreason = args.join(" ").slice(22);
	if (!wreason) msg.channel.send("Please Specify A Reason!");

  	if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  	};

  	warns[wUser.id].warns++;

  	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  	});


  	let sicon = msg.guild.iconURL;
  	let warnembed = new Discord.RichEmbed()
  	.setDescription("Warn Log")
  	.setThumbnail(sicon)
  	.setColor("#f11515")
	.addField("Warned User", wUser)
	.addField("Warned By", `${msg.author}`)
	.addField("Number of Warnings", warns[wUser.id].warns)
	.addField("Reason", `${wreason}`);

	// let wchannel = msg.guild.channels.find(`name`, "warning-or-mute-logs");
	// if(!wchannel) return msg.channel.sendMessage("please add a #ban-kick-warning channel");
	msg.channel.send(warnembed);

}

module.exports.help = {
	name: "warn"
}
