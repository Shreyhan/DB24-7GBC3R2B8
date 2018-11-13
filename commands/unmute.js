const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let staffrole = msg.guild.roles.find("name", "Staff");
	let tounmute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
	if(!msg.member.roles.has(staffrole.id)) return msg.channel.send("You Cannot Unmute That Person");
	let muterole = msg.guild.roles.find(`name`, "Muted");
	await(tounmute.removeRole(muterole.id));
	// let mchannel = msg.guild.channels.find(`name`, "warning-or-mute-logs");
	// if(!mchannel) return msg.channel.sendMessage("please add a #ban-kick-warning channel");
	msg.channel.send(`**<@${tounmute.id}> has been unmuted!**`);
}

module.exports.help = {
	name: "unmute"
}
