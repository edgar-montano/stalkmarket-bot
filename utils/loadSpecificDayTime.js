const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
/**
 * Load a Specific Day and a Specific Time
 * @param {String} username - username of user
 * @param {String} dayOfWeek - three letter string representing day of week e.g. 'mon','tue','wed'
 * @param {String} timeOfDay - 'am' or 'pm'
 * @return {Number} - returns the value for this time or 0.
 */
module.exports = loadSpecificDayTime = (username, dayOfWeek, timeOfDay) => {
  const day = timeOfDay === "am" ? morning : afternoon;
  if (day.hasOwnProperty(dayOfWeek)) {
    if (day[dayOfWeek].hasOwnProperty(username)) {
      return day[dayOfWeek][username];
    }
  }
  return "";
};
