const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
		let kUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
		if (!kUser) return msg.channel.sendMessage("Please Specify Who you Want To Kick");
		let kreason = args.join(" ").slice(22);
		if (!kreason) return msg.channel.sendMessage(`Please Specify Why you Want To Kick ${kUser}`);
		if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("You Cannot Kick People!")
		if (msg.author.id === kUser.id) return;
		if (!kUser.manageable) return console.log(`${msg.author} tried to kick ${kUser} but failed`);
		// if(kUser.hasPermission("KICK_MEMBERS")) return msg.channel.send("You Cannot Kick That Person")


		let sicon = msg.guild.iconURL;
		let kickembed = new Discord.RichEmbed()
		.setDescription("Kick Log")
		.setThumbnail(sicon)
		.setColor("#f11515")
		.addField("Kicked User", kUser)
		.addField("Kicked By", `${msg.author}`)
		.addField("Reason", `${kreason}`)

		// let kchannel = msg.guild.channels.find(`name`, "ban-kick-warning");
		// if(!kchannel) return msg.channel.sendMessage("please add a #ban-kick-warning channel");

		msg.guild.member(kUser).kick(kreason);
		msg.channel.send(kickembed);

}

module.exports.help = {
	name: "kick"
}
