// const Discord = require("discord.js");
// let xp = require("../xp.json");

// module.exports.run = async (bot, msg, args) => {
// 	  if(!xp[msg.author.id]){
//    xp[msg.author.id] = {
//      xp: 0,
//      level: 1
//   };
// }
//   let curxp = xp[msg.author.id].xp;
//   let curlvl = xp[msg.author.id].level;
//   let nxtLvlXp = curlvl * 300;
//   let nxtLvl = curlvl + 1;
//   let difference = nxtLvlXp - curxp;

//   let lvlEmbed = new Discord.RichEmbed()
//   .setAuthor(msg.author.username)
//   .setColor("#551a8b")
//   .addField("Level", curlvl, true)
//   .addField("XP", curxp, true)
//   .addField(`Total xp for Level ${nxtLvl}`, nxtLvlXp, true)
//   .setFooter(`${difference} XP till level up`, msg.author.displayAvatarURL);

//   msg.channel.send(lvlEmbed)
// }

// module.exports.help = {
// 	name: "level"
// }