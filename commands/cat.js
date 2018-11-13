const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, msg, args) => {
	let {body} = await superagent.get(`https://nekos.life/api/v2/img/meow`)

      let catembed = new Discord.RichEmbed()
      .setAuthor("Cat")
      .setColor("#E7D4DE")
      .setImage(body.url);

      msg.channel.send(catembed);
};

module.exports.help = {
	name: "cat"
}
