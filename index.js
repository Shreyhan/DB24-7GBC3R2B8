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

// bot.on("guildMemberAdd", (member)=> {
//   let guild = member.guild;
//   // guild.channels.get("451806270186323969").send(`Hey ${member.user}, welcome to **${msg.guild.name}** 🎉🤗! Make Sure to check out #rules and #infos`);
//   console.log(`New Member On Server (${msg.guild.name})! : ${member.user}`);
// });

bot.on("message", async(msg) => {
	let message = msg
	if (msg.author.bot) return;
	if(message.channel.type === "dm") return;
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let logchannel = msg.guild.channels.find("name", "logs");
	let hyperlogs = msg.guild.channels.find("name", "📃-logs");
	let telepathicMClogs = msg.guild.channels.find("name", "message-history");

	if (hyperlogs) {
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}          ${msg.guild.name}`);
		hyperlogs.send(`${msg.author.tag} said "${msg.content.replace(/@/g, '')}" in ${msg.channel.name}`);
	} else if (telepathicMClogs) {
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}          ${msg.guild.name}`);
		telepathicMClogs.send(`${msg.author.tag} said "${msg.content.replace(/@/g, '')}" in ${msg.channel.name}`);
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
			msg.channel.send("`Restarted`")
    	msg.channel.send(`Logged in as ${bot.user}!`)
		} else {
			msg.channel.send(`you are not my owner...`)
		}
	}

	if (cmd === `${prefix}test`) {
		if(msg.author.id === `253796217820151808`) {
			msg.channel.send(`${bot.user.username} is on ${bot.guild.size} servers`)
		}
	}
});

bot.login(token).catch(err => console.log(err));
