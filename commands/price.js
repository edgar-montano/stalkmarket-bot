// const data = require("../data/data.json");
const writeData = require("../utils/writeData");
const writeCost = require("../utils/writeCost");

/**
 * Price stores the current days price into the corresponding JavaScript Object file.
 * @param {String} args[0] - must be a string containing either value 'am' or 'pm'
 * @param {Number} args[1] - must contain a numeric value greater then 1.
 */
module.exports = {
  name: "price",
  args: true,
  description:
    "Usage: `!price am|pm number`, e.g. `!price am 50`\n Price adds the current retail price value, use either am or pm to denote if the sell price represented is in the morning or afternoon.\n Price cannot be executed on Sundays, since you cannot sell on this day.",
  execute(message, args) {
    //first argument has to be a time of day.
    const timeOfDay = args[0].toLowerCase();
    if (timeOfDay !== "am" && timeOfDay !== "pm")
      message.reply(
        `${args[0]} is not a valid time of day, please pass in 'am' or 'pm' to denote time of day.`
      );

    let price = parseInt(args[1]); //price should be second parameter.
    if (isNaN(price) || price <= 0)
      message.channel.send(`${args[1]} is not a valid number.`);

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
