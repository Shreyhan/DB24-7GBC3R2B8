const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const token = process.env.token;
const Client = new Discord.Client();
var bot = new Discord.Client();
const fs = require("fs");
const prefix = botconfig.prefix;
const superagent = require("superagent");
// let xp = require("./xp.json");
// let warns = require("./warnings.json");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Could not find commands");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		if (props.help && props.help.name) {
			bot.commands.set(props.help.name, props);
		} else {
			console.error(`file ${f} does not have .help or .help.name property!`);
		}
	});
});

bot.on("ready", async () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	bot.user.setActivity(`${prefix}help`, { type: 'PLAYING' });
});

bot.on("guildMemberAdd", (member)=> {
  let guild = member.guild;
	if(guild.id === `567341656961974282`) {
		const welcomec = guild.channels.find("name","🙋-welcome")
		let welcembed = new Discord.RichEmbed()
		.setThumbnail(`https://imgur.com/a/8P1Zlkz`)
		.setColor("#343642")
		.setTitle("Welcome to The server!")
		.setDescription(`Welcome, ${member.user} to Hyper!`)
		.addField(' ', 'Make sure to follow the rules! 📃')
		.setFooter(`Members : ${guild.memberCount}`, member.avatarURL);
		welcomec.send(welcembed);
  	console.log(`New Member On Server (${guild.name})! : ${member.user}`);
	}
});

bot.on("message", async(msg) => {
	let message = msg
	if (msg.author.bot) return;
	if(message.channel.type === "dm") return;
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

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

	if(!msg.content.startsWith(botconfig.prefix)) return;
	let commandfile = bot.commands.get(cmd.slice(2));
	if(commandfile) commandfile.run(bot, msg, args);


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
