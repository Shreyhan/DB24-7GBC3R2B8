const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
	if (!bUser) return msg.channel.send("Please Specify Who you Want To Ban");
	let breason = args.join(" ").slice(22);
	if (!breason) return msg.channel.send(`Please Specify Why you Want To Ban ${bUser}`);
	if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("You Cannot Ban People!")
	if (msg.author.id === bUser.id) return;
	if (!bUser.manageable) return console.log(`${msg.author} tried to ban ${bUser} but failed`);
	// if(bUser.hasPermission("BAN_MEMBERS")) return msg.channel.send("You Cannot Ban That Person")


	let sicon = msg.guild.iconURL;
	let banembed = new Discord.RichEmbed()
	.setDescription("Ban Log")
	.setThumbnail(sicon)
	.setColor("#f11515")
	.addField("Banned User", bUser)
	.addField("Banned By", `${msg.author}`)
	.addField("Reason", `${breason}`)

	// let bchannel = msg.guild.channels.find(`name`, "ban-kick-warning");
	// if(!bchannel) return msg.channel.sendMessage("please add a #ban-kick-warning channel");

	msg.guild.member(bUser).ban(breason);
	msg.channel.send(banembed);
}

module.exports.help = {
	name: "ban"
}
