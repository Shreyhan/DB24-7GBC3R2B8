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

	// let tagchannel = msg.guild.channels.find("name", "warning-or-mute-logs");
	// if(msg.content.includes('@everyone')) {
	// 	tagchannel.send(`${msg.author} tagged everyone when he said "${msg.content.replace(/@/g, '')}" in #${msg.channel.name}`);
	// }
	// if(msg.content.includes('@here')) {
	// 	tagchannel.send(`${msg.author} tagged here when he said "${msg.content.replace(/@/g, '')}" in #${msg.channel.name}`);
	// }

	let logchannel = msg.guild.channels.find("name", "logs");

	if (!logchannel) {
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}`);
	} else {
		logchannel.send(`${msg.author.tag} said "${msg.content.replace(/@/g, '')}" in ${msg.channel.name}`);
		console.log(`${msg.author.tag} said "${msg}" in ${msg.channel.name}`);
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
		if(msg.member.roles.some(r=>["Admin", "Developer", "Owner"].includes(r.name)) ) {
			msg.channel.send("`Restarted`")
    		msg.channel.send(`Logged in as ${bot.user}!`)
		} else {
			msg.channel.send('You must be `Admin` or higher to use this command!')
		}
	}
});

bot.login(token).catch(err => console.log(err));
