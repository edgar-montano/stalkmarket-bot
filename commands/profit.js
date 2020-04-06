const data = require("../data/data.json");
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

    if (day === 0) {
      return message.reply(`Cannot calculate profits on Sundays`);
    }

    const todayPrice = parseInt(data[dateString][username]);
    if (isNaN(todayPrice)) {
      return message.reply(
        "No price has been added for today.\nFirst `!add PRICE_OF_TURNIP` for the day."
      );
    }

    const lastSunday = getLastSunday();
    const purchasePrice = parseInt(cost[lastSunday][username]);
    if (isNaN(purchasePrice))
      return message.reply(
        "Purchase price could not be calculated, did you run `!add COST_OF_TURNIP` on Sunday?"
      );

    const totalProfit = Math.floor((todayPrice / purchasePrice) * 100);
    return message.channel.send(
      `Your total profit if you were to sell is ${totalProfit}%`
    );
  },
};
