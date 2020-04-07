//const loadWeek = require("../utils/loadWeek");
const Discord = require("discord.js");
const cost = require("../data/cost.json");
const getProfit = require("../utils/getProfit");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const getArrow = require("../utils/getArrow");
module.exports = {
  name: "listprofits",
  description:
    "*Usage: `!listprofits`\nList all previous sell values for the week and calculate the profit.*",
  args: false,
  execute(message, args) {
    const embedData = new Discord.MessageEmbed()
      .setColor("#6969ff")
      .setTitle("List of all the profits by percentage.");

    const date = new Date();
    const day = date.getDay();

    let weekDays = Object.keys(morning);
    let totalDays = weekDays.slice(-day);
    let currentMorning = "";
    let currentAfternoon = "";

    for (let i = 0; i < totalDays.length; i++) {
      for (username in morning[totalDays[i]]) {
        currentMorning +=
          username +
          ": " +
          morning[totalDays[i]][username] +
          getArrow(getProfit(username, morning[totalDays[i]][username])) +
          "by " +
          getProfit(username, morning[totalDays[i]][username]) +
          "%\n";
      }
      if (currentMorning !== "")
        embedData.addField(totalDays[i] + " Morning", currentMorning, true);
      currentMorning = "";
      for (username in afternoon[totalDays[i]]) {
        currentAfternoon +=
          username +
          ": " +
          afternoon[totalDays[i]][username] +
          getArrow(getProfit(username, afternoon[totalDays[i]][username])) +
          "by " +
          getProfit(username, afternoon[totalDays[i]][username]) +
          "%\n";
      }
      if (currentAfternoon !== "")
        embedData.addField(totalDays[i] + " Afternoon", currentAfternoon, true);
      currentAfternoon = "";
    }
    message.channel.send(embedData);
  },
};
