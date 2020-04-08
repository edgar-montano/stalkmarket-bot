const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
/**
 * Check if a user has an entry for the current day.
 * @param {String} username - name of user.
 * @param {String} timeOfDay - either 'am' or 'pm'
 * @return {Boolean} - if user entry exists return true, else false.
 */
module.exports = checkUserEntry = (username, timeOfDay) => {
  const date = new Date().toDateString();
  const partOfDay = timeOfDay === "am" ? morning : afternoon;
  if (partOfDay.hasOwnProperty(date)) {
    const keys = partOfDay[date];
    if (keys.hasOwnProperty(username)) return true;
  }
  return false;
};
