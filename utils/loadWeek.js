const Discord = require("discord.js");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const getDate = require("../utils/getDate");
/**
 * Attempt to the load the morning values and afternoon values for the day.
 * @param {String} username - the name of user.
 */
module.exports = loadWeek = (username) => {
  const date = getDate(username);
  //can only be a value 0 - 6
  const day = date.getDay() !== 0 ? date.getDay() : 7;
  console.log(`Load week ${date} ${day}`);
  const emedData = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("This week's prices")
    .setAuthor(username);
  //error can occur if afternoon is not updated for the day yet.
  let weekDays =
    Object.keys(morning).length > Object.keys(afternoon).length
      ? Object.keys(morning)
      : Object.keys(afternoon);
  console.log(weekDays);
  let totalDays = weekDays.slice(-day).forEach((dayOfWeek) => {
    let morningValue = "n/a";
    let afternoonValue = "n/a";
    //check morning values of the week
    if (morning.hasOwnProperty(dayOfWeek)) {
      let currentMorning = morning[dayOfWeek];
      if (currentMorning.hasOwnProperty(username)) {
        morningValue = morning[dayOfWeek][username];
      }
    }
    //check afternoon values of teh week
    if (afternoon.hasOwnProperty(dayOfWeek)) {
      let currentAfternoon = afternoon[dayOfWeek];
      if (currentAfternoon.hasOwnProperty(username)) {
        afternoonValue = afternoon[dayOfWeek][username];
      }
    }

    emedData.addField(
      dayOfWeek,
      "Morning - " + morningValue + " | Afternoon - " + afternoonValue
    );
  });
  return emedData;
};
