const fs = require("fs");
const data = require("../data/data.json");
/**
 * Attempts to write information to the data.json file.
 * @param {String} name - Name of user to write information about
 * @param {Number} price - Current days price information.
 * @return {Boolean} - false if write failed, true otherwise.
 */
module.exports = writeData = (name, price) => {
  let currentDate = new Date().toDateString();
  price = parseInt(price);

  if (!price) return false;

  //if date doesn't exist, initialize it as an object.
  if (!data[currentDate]) {
    data[currentDate] = {};
    //use computed property names to store data.
    data[currentDate][name] = price;
  } else {
    data[currentDate][name] = price;
  }

  fs.writeFile(
    __dirname + "/../data/data.json",
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.error(err);
        return false;
      }
      //   console.log(data);
    }
  );
  return true;
};
