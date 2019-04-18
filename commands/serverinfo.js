const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	  function checkBots(guild) {
    let botCount = 0; // This is value that we will return
    guild.members.forEach(member => { // We are executing this code for every user that is in guild
      if(member.user.bot) botCount++; // If user is a bot, add 1 to botCount value
    });
    return botCount; // Return amount of bots
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; // If user isn't bot, add 1 to value.
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
