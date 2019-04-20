// const Discord = require("discord.js");
//
// module.exports.run = async (bot, msg, args) => {
// 	if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("You Cannot Do This Command");
//     if (!args[0]) return msg.channel.send("Please Specify How Many Messages You Want To Remove");
// 		msg.delete();
//     msg.channel.bulkDelete(args[0]).then(() => {
//     msg.channel.send(`Cleared ${args[0]} Messages For You`).then(msg => msg.delete(5000));
//     });
// }
//
// module.exports.help = {
// 	name: "clear"
// }
