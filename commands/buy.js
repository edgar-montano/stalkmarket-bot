const writeCost = require("../utils/writeCost");
const getLastSunday = require("../utils/getLastSunday");
const getDate = require("../utils/getDate");
/**
 * Price stores the current days cost value into the corresponding JavaScript Object file.
 * @param {Number} args[0] - must contain a numeric value greater then 1.
 */
module.exports = {
  name: "buy",
  args: true,
  description:
    "Usage: `!buy number`, e.g. `!buy 50`\n This is the buy value you purchased the turnips at.\n If current day is not Sunday, it will update the value of the last Sunday",
  execute(message, args) {
    //price cannot be a negative value, and must be a number.
    let price = parseInt(args[0]); //price should be second parameter.
    if (isNaN(price) || price <= 0)
      message.channel.send(`${args[0]} is not a valid number.`);

    // let checkDate = new Date().getDay();
    let checkDate = getDate(username).getDay();
    //on sundays, do not allow to write to regular data.
    //you cannot technically sell on sundays, you can only buy.
    if (checkDate === 0) {
      writeCost(message.author.username.slice(0, 5), price);
    } else {
      const lastSunday = getLastSunday();
      if (!writeCost(message.author.username.slice(0, 5), price, lastSunday)) {
        return message.channel.send(
          "An error has occured attempting to add your value"
        );
      }
    }
    return message.channel.send(
      "Value has been added to cost analysis, please use `!cost` to display "
    );
  },
};
