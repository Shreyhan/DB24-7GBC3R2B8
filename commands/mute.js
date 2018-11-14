const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, msg, args) => {

	//!!mute @Shrey87 1s/m/h/d REASON
		// let staffrole = msg.guild.roles.find("name", "Staff");
		let tomute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
		let mreason = args.join(" ").slice(25);
		if (!mreason) return msg.channel.sendMessage(`Please Specify The Reason`);
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You Cannot Mute People!");
	  if (!tomute) return msg.channel.send("Couldn't find user.");
		// if (tomute.hasPermission("MANAGE_ROLES")) return msg.channel.send("Can't mute them!");
	 	let muterole = msg.guild.roles.find(`name`, "Muted");
	 	 //start of create role
		 if(!muterole){
	   		try{
	      		muterole = await msg.guild.createRole({
	        		name: "Muted",
	        		color: "#000000",
	        		permissions:[]
	     		})
	      		msg.guild.channels.forEach(async (channel, id) => {
	        	await channel.overwritePermissions(muterole, {
	          		SEND_MESSAGES: false,
	         		ADD_REACTIONS: false
	        	});
	     	  });
	    	}catch(e){
	      console.log(e.stack);
	    }
	  }
	  //end of create role
		let mutetime = args[1];
  		if(!mutetime) return msg.channel.send("You didn't specify a time!");

  		await(tomute.addRole(muterole.id));
  		// let mchannel = msg.guild.channels.find(`name`, "warning-or-mute-logs");
		// if(!mchannel) return msg.channel.sendMessage("please add a #ban-kick-warning channel");
		let sicon = msg.guild.iconURL;
		let membed = new Discord.RichEmbed()
		.setDescription("Mute Log")
		.setThumbnail(sicon)
		.setColor("#f11515")
		.addField("Muted User", tomute)
		.addField("Muted By", `${msg.author}`)
		.addField("Muted For", `${ms(ms(mutetime))}`)
		.addField("Reason", `${mreason}`)
		msg.channel.send(membed);
 		// msg.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  		setTimeout(function(){
   		tomute.removeRole(muterole.id);
    	msg.channel.send(`**<@${tomute.id}> has been unmuted!**`);
 		}, ms(mutetime));


	//end of module

	}

module.exports.help = {
	name: "mute"
}
