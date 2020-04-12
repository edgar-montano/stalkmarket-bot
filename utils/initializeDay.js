const fs = require("fs");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const checkDay = require("./checkDay.js");
const getDate = require("../utils/getDate");
/**
 * Initializes a day by creating an empty object for that day.
 */
module.exports = initializeDay = (username = null) => {
  //   const date = new Date().toDateString();
  const date =
    username !== null
      ? getDate(username).toDateString()
      : new Date().toDateString();
  if (!checkDay(date, "am")) {
    morning[date] = {};
    fs.writeFile(
      __dirname + "/../data/price_am.json",
      JSON.stringify(morning),
      (err) => {
        if (err) {
          console.error(err);
          return false;
        }
      }
    );
  }

  if (!checkDay(date, "pm")) {
    afternoon[date] = {};
    fs.writeFile(
      __dirname + "/../data/price_am.json",
      JSON.stringify(afternoon),
      (err) => {
        if (err) {
          console.error(err);
          return false;
        }
      }
    );
  }
};
