const Discord = require("discord.js");
const loadDay = require("../utils/loadDay");
const loadWeek = require("../utils/loadWeek");
/**
 * Attempt to load current users price information for the week.
 * @param {String} username - The username of the current user.
 * @param {Boolean} week - Whether to load the full week or just today.
 */
module.exports = loadPrice = (username, week = false) => {
  // inside a command, event listener, etc.
  if (week === false) {
    const day = loadDay(username, week);
    return day;
  } else {
    const week = loadWeek(username);
    return week;
  }
};
