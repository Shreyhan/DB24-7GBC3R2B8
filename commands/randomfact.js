const Discord = require("discord.js");
const rf = require('random-facts');

module.exports.run = async (bot, msg, args) => {
  msg.channel.send({embed: {
       color: 0x00ff00,
       title: `:dolphin: Fun Fact`,
       description: rf.randomFact(),
       }
     });
};

module.exports.help = {
	name: "randomfact"
}
