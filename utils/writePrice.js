const fs = require("fs");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
/**
 * Attempts to write information to the proper price JavaScript Object file..
 * @param {String} name - Name of user to write information about
 * @param {String} timeOfDay - String value of either am or pm.
 * @param {Number} price - Current days price information.
 * @return {Boolean} - false if write failed, true otherwise.
 */
module.exports = writePrice = (username, timeOfDay, price) => {
  const date = new Date();
  const currentDate = date.toDateString();
  const day = date.getDay();
  if (day === 0) return false;
  if (timeOfDay === "am") {
    //if currentDate has not been added to file, add it first, otherwise undefine will occur.
    if (!morning[currentDate]) {
      morning[currentDate] = {};
    }
    morning[currentDate][username] = price;

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
    return true;
  } else if (timeOfDay === "pm") {
    if (!afternoon[currentDate]) {
      afternoon[currentDate] = {};
    }
    afternoon[currentDate][username] = price;
    fs.writeFile(
      __dirname + "/../data/price_pm.json",
      JSON.stringify(morning),
      (err) => {
        if (err) {
          console.error(err);
          return false;
        }
      }
    );
    return true;
  }
  return false;
};
