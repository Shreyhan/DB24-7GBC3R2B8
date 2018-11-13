const Discord = require("discord.js");
const cowsay = require('cowsay');

module.exports.run = async (bot, msg, args) => {
  let text = args.join(" ");
  msg.channel.send("```" + cowsay.say({
        text : text
    }) + "```")
  msg.delete();
};

module.exports.help = {
	name: "cowsay"
}
