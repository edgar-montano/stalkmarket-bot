const cost = require("../data/cost.json");
const getLastSunday = require("../utils/getLastSunday");
/**
 * Attempts to calculate the profit.
 * @param {String} username - username of profit to get.
 * @param {Number} price - sell price for the item
 * @return {Boolean|Number} - Returns profit or false if profit could not be calculated.
 */
module.exports = getProfit = (username, price) => {
  const sunday = getLastSunday();
  if (cost.hasOwnProperty(sunday)) {
    let lastSunday = cost[sunday];
    if (lastSunday.hasOwnProperty(username)) {
      return Math.floor((price / lastSunday[username]) * 100) - 100;
    }
  }
  return false;
};
