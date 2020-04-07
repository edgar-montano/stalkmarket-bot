const getProfit = require("../utils/getProfit");
module.exports = {
  name: "getprofit",
  description:
    "*Usage: `!getprofit NUMBER` e.g. `!getprofit 102`\nCalculates your potential profit based on the number specified.*",
  args: true,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    const price = parseInt(args[0]);
    if (isNaN(price))
      return message.reply(
        `${price} is not a number. Please see !help for more info.`
      );

    const profit = getProfit(username, price);
    if (profit !== false)
      message.reply(
        `Your total profit would be ${profit}% if you sold for that amount.`
      );
    else message.reply(`Profit could not be calculated for ${price} `);
  },
};
