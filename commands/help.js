const fs = require("fs");
// const { prefix } = require("../config.json");
const prefix = process.env.prefix || "!";
const Discord = require("discord.js");
module.exports = {
  name: "help",
  args: false,
  description: "Gives a list of the available commands.",
  execute(message, args) {
    let commandList = [];
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      commandList.push({
        name: prefix + command.name,
        value: command.description,
      });
    }

    const embedData = new Discord.MessageEmbed()
      .setColor("#0800ff")
      .setTitle("Usage")
      .setDescription("These are the following commands available")
      .setTimestamp()
      .setFooter("https://github.com/edgar-montano/stalkmarket-bot")
      .addFields(commandList);

    return message.channel.send(embedData);
  },
};
