const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, msg, args) => {
	let color = ((1 << 24) * Math.random() | 0).toString(16);
	let {body} = await superagent.get(`https://api-to.get-a.life/meme`)

      let memeembed = new Discord.RichEmbed()
      .setAuthor("Meme")
      .setColor(`${color}`)
      .setImage(body.url);

      msg.channel.send(memeembed);
};

module.exports.help = {
	name: "meme"
}
