const fs = require("fs");
const data = require("../data/data.json");

module.exports = loadData = (date) => {
  let dataToString = "";
  let entries = data[date];
  if (!entries) return undefined;
  for (name in entries) {
    dataToString += name + " - " + entries[name] + "\n";
  }
  return dataToString;
};
