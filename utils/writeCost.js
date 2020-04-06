const fs = require("fs");
const cost = require("../data/cost.json");

/**
 * Attempts to write information to the cost.json file.
 * @param {String} name - Name of user to write information about
 * @param {Number} price - Current days price information.
 * @param {Date} date - determines what sunday you wish to update to.
 * @return {Boolean} - false if write failed, true otherwise.
 */
module.exports = writeCost = (name, price, currentDate = null) => {
  if (currentDate === null) {
    currentDate = new Date().toDateString();
  }
  price = parseInt(price);

  if (!price || price <= 0) return false;

  //if date doesn't exist, initialize it as an object.
  if (!cost[currentDate]) {
    cost[currentDate] = {};
    //use computed property names to store cost.
    cost[currentDate][name] = price;
  } else {
    cost[currentDate][name] = price;
  }

  fs.writeFile(
    __dirname + "/../data/cost.json",
    JSON.stringify(cost),
    (err) => {
      if (err) {
        console.error(err);
        return false;
      }
      //   console.log(cost);
    }
  );
  return true;
};
