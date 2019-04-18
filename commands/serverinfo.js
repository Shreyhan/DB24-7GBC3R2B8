const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	  function checkBots(guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++;
    });
    return memberCount;
  }
	let sicon = msg.guild.iconURL;
		var d = msg.guild.createdAt;

		var date = d.getDate();

		var month = d.getMonth();
		var rmonth = month + 1;

		var year = d.getFullYear();


		let serverembed = new Discord.RichEmbed()
		.setThumbnail(sicon)
		.setColor("#f11515")
		.addField("Server Name", msg.guild.name)
		.addField('Server owner', msg.guild.owner)
		.addField("Created On", `${date}/${rmonth}/${year}`)
		.addField("Total Members", msg.guild.memberCount)
		.addField('Humans', checkMembers(msg.guild), true)
   		.addField('Bots', checkBots(msg.guild), true)

		return msg.channel.send(serverembed);
}

module.exports.help = {
	name: "serverinfo"
}
