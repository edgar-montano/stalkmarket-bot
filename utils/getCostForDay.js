const cost = require("../data/cost.json");
const getLastSunday = require("../utils/getLastSunday");
const getPrevSunday = require("../utils/getPreviousSunday");
/**
 * Attempts to get cost for a specific day
 * @param {String} username - username of profit to get.
 * @param {Date} date - date you want to check for last sunday cost
 * @return {Boolean|Number} - Returns profit or false if profit could not be calculated.
 */
module.exports = getCostForDay = (username, date) => {
  const thisLastSunday = new Date(getLastSunday());
  const prevSunday = new Date(getPrevSunday());
  const sunday =
    new Date(date).getTime() > thisLastSunday.getTime()
      ? thisLastSunday.toDateString()
      : prevSunday.toDateString();
  if (cost.hasOwnProperty(sunday)) {
    let lastSunday = cost[sunday];
    if (lastSunday.hasOwnProperty(username)) {
      return lastSunday[username];
    }
  }
  return false;
};
