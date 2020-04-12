// const loadWeek = require("../utils/loadWeek");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const Discord = require("discord.js");
const getDate = require("../utils/getDate");
/**
 * Note due to performance issue and addField limit to 25, this does not scale to large servers and therefore
 * is only a development test of data.
 */
module.exports = {
  name: "listall",
  description:
    "*Usage: `!listall`\nList all previous sell values for the week.*",
  args: false,
  execute(message, args) {
    const name = message.author.username.slice(0, 5);
    const embedData = new Discord.MessageEmbed()
      .setColor("#ff0073")
      .setTitle("This week's prices for all users");
    const date = getDate(name);
    const day = date.getDay();

    let weekDays =
      Object.keys(morning).length > Object.keys(afternoon).length
        ? Object.keys(morning)
        : Object.keys(afternoon);
    let totalDays = weekDays.slice(-day);
    let currentMorning = "";
    let currentAfternoon = "";
    for (let i = 0; i < totalDays.length; i++) {
      for (username in morning[totalDays[i]]) {
        currentMorning +=
          username + ": " + morning[totalDays[i]][username] + "\n";
      }
      if (currentMorning !== "")
        embedData.addField(totalDays[i] + " Morning", currentMorning, true);
      currentMorning = "";
      for (username in afternoon[totalDays[i]]) {
        currentAfternoon +=
          username + ": " + afternoon[totalDays[i]][username] + "\n";
      }
      if (currentAfternoon !== "")
        embedData.addField(totalDays[i] + " Afternoon", currentAfternoon, true);
      currentAfternoon = "";
    }
    message.channel.send(embedData);
  },
};
