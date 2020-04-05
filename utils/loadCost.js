const fs = require("fs");
const cost = require("../data/cost.json");

module.exports = loadCost = (date) => {
  let dataToString = "";
  if (!date) {
    for (date in cost) {
      dataToString += date + "\n---------------\n";
      let entries = cost[date];
      for (name in entries) {
        dataToString += name + " - " + entries[name] + "\n";
      }
      dataToString += "---------------\n\n";
    }
    return dataToString;
  }
  let entries = cost[date];
  if (!entries) return undefined;
  for (name in entries) {
    dataToString += name + " - " + entries[name] + "\n";
  }
  return dataToString;
};
