const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const cost = require("../data/cost.json");
const getLastSunday = require("../utils/getLastSunday");
/**
 * Calculates the potential profit for today.
 */
module.exports = {
  name: "profit",
  description:
    "*Usage: `!profit`\nCalculates the profit you would make if you were to sell today.*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    let date = new Date();
    const dateString = date.toDateString();
    const day = date.getDay();

    // if the current day is sunday, you cannot yield any profit.
    if (day === 0) {
      return message.reply(`Cannot calculate profits on Sundays`);
    }

    //if user hasnt entered any information for today.
    if (!morning[dateString][username] && !afternoon[dateString][username])
      return message.reply(
        "You have not added any values today. Please see `!sell` function for more info."
      );

    let todayPrice = 0;
    console.log("Right before the function...");
    //if the latest value is afternoon, use it as todays price
    if (afternoon.hasOwnProperty(dateString)) {
      let currentAfternoon = afternoon[dateString];
      if (currentAfternoon.hasOwnProperty(username))
        todayPrice = parseInt(afternoon[dateString][username]);
    }

    //if its still the morning use that instead
    else if (morning.hasOwnProperty(dateString)) {
      let currentMorning = morning[dateString];
      if (currentMorning.hasOwnProperty(username))
        todayPrice = parseInt(morning[dateString][username]);
    } else {
      return message.reply(
        "An error has occured, you do not have any values for today. Please see `!sell` for more info"
      );
    }
    if (isNaN(todayPrice)) {
      return message.reply(
        "No price has been added for today.\nUse the `!sell` command to add a new value for today"
      );
    }

    const lastSunday = getLastSunday();
    const purchasePrice = parseInt(cost[lastSunday][username]);
    if (isNaN(purchasePrice))
      return message.reply(
        "Purchase price could not be calculated, did you run `!buy COST_OF_TURNIP` on Sunday?"
      );

    const totalProfit = Math.floor((todayPrice / purchasePrice) * 100) - 100;
    return message.channel.send(
      `Your total profit if you were to sell is ${totalProfit}% if you sell at ${todayPrice} and you purchased at ${purchasePrice}`
    );
  },
};
