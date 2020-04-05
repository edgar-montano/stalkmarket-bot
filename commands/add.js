// const data = require("../data/data.json");
const writeData = require("../utils/writeData");
const writeCost = require("../utils/writeCost");

module.exports = {
  name: "add",
  args: true,
  description: "Add a new price value for today.",
  execute(message, args) {
    let price = parseInt(args[0]);
    if (isNaN(price)) message.channel.send(`${args[0]} is not a number.`);
    let checkDate = new Date().getDay();
    //on sundays, do not allow to write to regular data.
    //you cannot technically sell on sundays, you can only buy.
    if (checkDate === 0) {
      writeCost(message.author.username.slice(0, 5), price);
      return message.channel.send(
        "Value has been added to cost analysis, please use `!cost` to display "
      );
    } else if (writeData(message.author.username.slice(0, 5), price)) {
      return message.channel.send(
        "Price has been updated correctly, please use `!today` or `!list` to see more information."
      );
    } else {
      return message.channel.send(
        "An error has occured attempting to add your value"
      );
    }
  },
};
