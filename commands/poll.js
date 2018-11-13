const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  msg.delete();
  let color = ((1 << 24) * Math.random() | 0).toString(16);
  if (!args[0]) msg.channel.send(`Proper Usage: ${prefix}poll Question`)
  let pollembed = new Discord.RichEmbed()
  .setColor(`#${color}`)
  .setTitle("React to vote!")
	.setDescription(`${args.join(" ")}`)
  .setFooter(`Poll Created by ${msg.author.username}`);
  let pollmsg = await msg.channel.send(pollembed);
  await pollmsg.react("✅");
  await pollmsg.react("❌");
}

module.exports.help = {
	name: "poll"
}
