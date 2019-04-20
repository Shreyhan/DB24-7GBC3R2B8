const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const token = process.env.token;
const Client = new Discord.Client();
var bot = new Discord.Client();
const prefix = botconfig.prefix;
const superagent = require("superagent");
const { CommandHandler } = require('djs-commands');
const CH = new CommandHandler({
	folder: __dirname + "/commands/",
	prefix: [`!!`]
});





bot.on("ready", async () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	bot.user.setActivity(`${prefix}help`, { type: 'PLAYING' });
});

bot.on("guildMemberAdd", (member)=> {
  let guild = member.guild;
	if(guild.id === `386171809080410122`) {
		const welcomec = guild.channels.find("name","🙋-welcome")
		let welcembed = new Discord.RichEmbed()
		.setThumbnail(`https://images-ext-2.discordapp.net/external/iX4fv9Xg4ucJsTT0tFw4h88VWA9v2s-EyhRQJZ0IDoA/https/cdn.glitch.com/4fb5d491-ea93-4b55-a6e0-aa811fa4b052%252Fwelcome%2520%281%29.gif`)
		.setColor("#343642")
		.setTitle("Welcome to The server!")
		.setDescription(`Welcome, **${member.user.tag}** to Hyper!`)
		.addField("\u200b", 'Make sure to follow the rules! 📃')
		.setTimestamp()
		.setFooter(`Members : ${guild.memberCount}`, member.avatarURL);
		welcomec.send(welcembed);
  	console.log(`New Member On Server (${guild.name})! : ${member.user}`);
		if(!member.user.bot) {
			var memberrole = member.guild.roles.find("name", "🔹 | Rookie [0-5]");
			member.addRole(memberrole);
		} else {
			var botrole = member.guild.roles.find("name", "🤖 | Bots");
			member.addRole(botrole);
		}
	}
});
//
// bot.on("guildMemberRemove", (member) => {
//
// });

bot.on("message", async(msg) => {
	let message = msg
	if (msg.author.bot) return;
	if(message.channel.type === "dm") return;
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	//logs
	let logchannel = msg.guild.channels.find("name", "logs");
	let hyperlogs = msg.guild.channels.find("name", "📃-logs");

	if (hyperlogs) {
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}          ${msg.guild.name}`);
		hyperlogs.send(`${msg.author.tag} said "${msg.content.replace(/@/g, '')}" in ${msg.channel.name}`);
	} else if (logchannel) {
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}          ${msg.guild.name}`);
		logchannel.send(`${msg.author.tag} said "${msg.content.replace(/@/g, '')}" in ${msg.channel.name}`);
	} else {
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}          ${msg.guild.name}`);
	}
	//end of logs

	let ccmd = CH.getCommand(command);
	if(!ccmd) return;
	try{
		ccmd.run(bot, msg, args);
	}catch(e){
		console.log(e)
	}



    if (cmd === `${prefix}avatar`) {
    let AvUser = message.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if (!AvUser) {
			msg.channel.send(msg.author.avatarURL);
		} else {
			msg.channel.send(msg.mentions.users.first().avatarURL);
		}
    }
  	if (cmd === `${prefix}say`) {
    msg.channel.send(args.join(" "));
		msg.delete();
	  }


	if (cmd === `${prefix}ping`){
		msg.channel.send(`Pinging....`).then(function(m) {
			m.edit(`:ping_pong: **Pong!** - Took ${m.createdTimestamp - msg.createdTimestamp}ms`);
		})
    }

	if (cmd === `${prefix}restart`) {
		if(msg.author.id === `253796217820151808`) {
			msg.channel.send("`Restarting...`").then(function(m) {
				m.edit("Restarted!");
			})
    	msg.channel.send(`Logged in as ${bot.user}!`)
		} else {
			msg.channel.send(`you are not my owner...`)
		}
	}


	if (cmd === `${prefix}servers`) {
		if(msg.author.id === `253796217820151808`) {
				msg.channel.send("I am in")
		    bot.guilds.forEach((guild) => {
		        msg.channel.send(" - " + guild.name + " With the ID " + guild.id);
		    })
		}
	}
	// if (cmd === `${prefix}leave`) {
	// 	if(msg.author.id === `253796217820151808`) {
	// 		bot.guilds.get("GUILD ID").leave()
	// 	}
	// }
});

bot.login(token).catch(err => console.log(err));
