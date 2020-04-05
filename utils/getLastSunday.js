const cost = require("../data/cost.json");

module.exports = getLastSunday = () => {
  const lastSunday = Object.keys(cost);
  return lastSunday[lastSunday.length - 1];
};
