const cost = require("../data/cost.json");

module.exports = getPreviousSunday = () => {
  const lastSunday = Object.keys(cost);
  return lastSunday[lastSunday.length - 2];
};
