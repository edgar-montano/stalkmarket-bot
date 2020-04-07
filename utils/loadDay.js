const Discord = require("discord.js");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");

/**
 * Attempt to the load the morning values and afternoon values for the day.
 * @param {String} username - the name of user.
 */
module.exports = loadMorning = (username, week) => {
  const date = new Date();
  //   const day = date.getDay(); // value from 0 to 6
  const currentDate = date.toDateString();
  let currentMorning = "n/a";
  let currentAfternoon = "n/a";
  if (morning.hasOwnProperty(currentDate)) {
    let totalMorning = morning[currentDate];
    if (totalMorning.hasOwnProperty(username))
      currentMorning = morning[currentDate][username];
  }

  if (afternoon.hasOwnProperty(currentDate)) {
    let totalAfternoon = afternoon[currentDate];
    if (totalAfternoon.hasOwnProperty(username))
      currentAfternoon = afternoon[currentDate][username];
  }

  const todayMsg =
    "Morning - " + currentMorning + " | Afternoon - " + currentAfternoon;
  const emedData = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Todays prices")
    .setAuthor(username);
  //load just today
  emedData.addField(currentDate, todayMsg);
  return emedData;
};
