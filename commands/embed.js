const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let sicon = msg.guild.iconURL;
	let embedembed = new Discord.RichEmbed()
	.setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL)
	.setDescription(`${args.join(" ")}`)
	.setColor("#1600ff");
	// .setThumbnail(sicon)
	// #f11515

	 msg.channel.send(embedembed);
	 msg.delete();

}

module.exports.help = {
	name: "embed"
}