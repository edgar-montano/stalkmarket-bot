const fs = require("fs");
const cost = require("../data/cost.json");
const Discord = require("discord.js");

module.exports = loadCost = (date) => {
  const embedData = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Cost of Turnips")
    .setDescription("This represents the cost of the turnips. ")
    .setTimestamp()
    .setFooter("https://github.com/edgar-montano/stalkmarket-bot");

  let dataToString = "";
  if (!date) {
    for (date in cost) {
      dataToString += date + "\n---------------\n";
      let entries = cost[date];
      for (name in entries) {
        embedData.addField(name, entries[name], true);
      }
      dataToString += "---------------\n\n";
    }
    return embedData;
  }
  let entries = cost[date];
  if (!entries) return undefined;
  for (name in entries) {
    embedData.addField(name, entries[name], true);
  }
  return embedData;
};
