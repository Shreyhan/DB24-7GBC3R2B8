const Discord = require("discord.js");
const botconfig = require("./../botconfig.json");
const prefix = botconfig.prefix;

module.exports.run = async (bot, msg, args) => {
		let sicon = msg.guild.iconURL;
		let helpembed = new Discord.RichEmbed()
		.setTitle("Command List!")
		.setThumbnail(sicon)
		.setColor("#f11515")
		.addField(`${prefix}help`, "Brings Up This Page")
		.addField(`${prefix}ping`, `Shows ping`)
		// .addField(`${prefix}level`, "Shows Your Level")
		.addField(`${prefix}serverinfo`, "Gives Info on Server")
		.addField(`${prefix}avatar`, `${prefix}avatar @mike#1234 \n Shows User Avatar`)
		.addField(`${prefix}say`, `${prefix}say 1234 \n Test it out!`)
		.addField(`${prefix}poll`, `${prefix}poll <Question>`)
		// .addField(`${prefix}warns`, `${prefix}warns @mike#1234 \n Checks The Number Of Times A User Has Been Warned`)
		.addField(`${prefix}ascii`, `${prefix}ascii TEST \n Test it out Yourself!`)
		.addField(`${prefix}8ball`, `${prefix}ball <Question> \n Test it out Yourself!`)
		.addField(`${prefix}howgay`, `${prefix}howgay @mike#1234`)
		.addField(`${prefix}embed`, `${prefix}embed <Message>`)
		.addField(`${prefix}cowsay`, `Make a cow say something`)
		.addField(`${prefix}randomfact`, `Gives a random fact!`)
		.addField(`${prefix}dog`, `Random Dog Picture`)
		.addField(`${prefix}cat`, `Random Cat Picture`)
		.addField(`${prefix}meme`, `Random Meme Picture`);
		// .addField(`${prefix}memetext`, `Random Meme Text`);

		let helpstaffembed = new Discord.RichEmbed()
		.setTitle("Staff Commands")
		.setThumbnail(sicon)
		.setColor("#4d88ff")
		.addField(`${prefix}mute`, `${prefix}mute @mike#1234 1s/m/h/d Swearing \n Mutes User`)
		.addField(`${prefix}unmute`, `${prefix}unmute @mike1234 \n Unmutes User`)
		.addField(`${prefix}clear`, `clears messages!`)
		// .addField(`${prefix}restart`, `${prefix}restart \n Restarts bot`)
		// .addField(`${prefix}warn`, `${prefix}warn @mike#1234 Swearing \n Warns User`)
		.addField(`${prefix}kick`, `${prefix}kick @mike#1234 Too Many Infractions \n Kicks User`)
		.addField(`${prefix}ban`, `${prefix}ban @mike#1234 Being Rude \n Bans User`)
		.addField(`If you want logs of the server`, `create a channel called #logs`);

		// let noteembed = new Discord.RichEmbed()
		// .setTitle("Important!")
		// .setThumbnail(sicon)
		// .setColor("#00ff99")
		// .addField("\n\nPlease Note", "The bot is still under development so it may go down often. \n Recommend new commands to staff \n Ping a staff member to report a problem.");

		msg.channel.send(helpembed);
		msg.channel.send(helpstaffembed);
		// msg.channel.send(noteembed);

		//return msg.channel.send("`HyperMC Bot Commands!` \n \n **h?level** \n //Checks Your Level \n \n **h?serverinfo** \n //Gives Server Info! \n \n **h?avatar** \n //Shows Avatar! \n \n **h?say** \n //h?say 1234 \n \n **h?warns** \n //Checks The Number Of  Warns You Have \n \n `COMMANDS FOR STAFF` \n \n **h?mute** \n //h?mute @mike#1234 1s/m/h/d Swearing \n \n **h?unmute** \n //h?unmute @mike#1234 \n \n **h?warn** \n //h?warn @mike#1234 Swearing \n \n **h?ban** \n // h?ban @mike#1234 Swearing \n \n **h?kick** \n //h?kick @mike#1234 Swearing \n \n Ping a staff member to report a problem. \n Recommend new commands in #im-outa-bot-ideas  \n The bot is still under development so it may go down often.");
}

module.exports.help = {
	name: "help"
}
