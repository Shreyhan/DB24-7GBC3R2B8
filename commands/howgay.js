const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

msg.channel.send(`${getRandomInt(100)}% gay`);
};

module.exports.help = {
	name: "howgay"
}
