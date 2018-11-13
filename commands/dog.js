const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, msg, args) => {
	let {body} = await superagent.get(`https://random.dog/woof.json`)

      let dogembed = new Discord.RichEmbed()
      .setAuthor("Dog")
      .setColor("#D4DEE7")
      .setImage(body.url);

      msg.channel.send(dogembed);
};

module.exports.help = {
	name: "dog"
}
