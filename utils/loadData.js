const fs = require("fs");
const data = require("../data/data.json");

module.exports = loadData = (date) => {
  let dataToString = "";
  if (!date) {
    for (date in data) {
      dataToString += date + "\n---------------\n";
      let entries = data[date];
      for (name in entries) {
        dataToString += name + " - " + entries[name] + "\n";
      }
      dataToString += "---------------\n\n";
    }
    return dataToString;
  }
  let entries = data[date];
  if (!entries) return undefined;
  for (name in entries) {
    dataToString += name + " - " + entries[name] + "\n";
  }
  return dataToString;
};

// console.log(loadData(new Date().toDateString()));
// console.log(loadData());
