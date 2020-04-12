const Discord = require("discord.js");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const checkUserEntry = require("../utils/checkUserEntry");
const checkDay = require("../utils/checkDay");
const initializeDay = require("../utils/initializeDay");
const getDate = require("../utils/getDate");
/**
 * Attempt to the load the morning values and afternoon values for the day.
 * @param {String} username - the name of user.
 */
module.exports = loadDay = (username, week) => {
  const date = getDate(username);
  //   const day = date.getDay(); // value from 0 to 6
  const currentDate = date.toDateString();
  let currentMorning = "n/a";
  let currentAfternoon = "n/a";
  if (checkUserEntry(username, "am")) {
    currentMorning = morning[currentDate][username];
  }

  if (checkUserEntry(username, "pm")) {
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
