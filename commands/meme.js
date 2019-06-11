// const Discord = require("discord.js");
// const superagent = require("superagent");
const Discord = require("discord.js");
const snekfetch = require('snekfetch');
//
module.exports.run = async (bot, msg, args) => {
	let color = ((1 << 24) * Math.random() | 0).toString(16);
// 	let {body} = await superagent.get(`https://api-to.get-a.life/meme`)
//
//       let memeembed = new Discord.RichEmbed()
//       .setAuthor("Meme")
//       .setColor(`${color}`)
//       .setImage(body.url);
//
//       msg.channel.send(memeembed);

try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return msg.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const memeembed = new Discord.RichEmbed()
        .setColor(`${color}`)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter("Memes found on r/dankmemes")
        msg.channel.send(memeembed)
    } catch (err) {
        return console.log(err);
    }
};
module.exports.help = {
	name: "meme"
}
