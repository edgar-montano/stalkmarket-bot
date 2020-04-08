const getLastSunday = require("../utils/getLastSunday");
const cost = require("../data/cost.json");
const Discord = require("discord.js");
const getArrow = require("../utils/getArrow");
module.exports = {
  name: "sellnow",
  description:
    "*Usage: `!sellnow SELL_PRICE NUMBER_OF_TURNIPS` e.g. `!sellnow 94 300`\nCalculates the profit you would make if you were to sell now.*",
  args: true,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    const sunday = getLastSunday();

    const price = parseInt(args[0]);
    const amount = parseInt(args[1]);
    if (isNaN(price) || isNaN(amount)) {
      return message.reply(
        `${args[0]} and ${args[1]} are not valid inputs, they must be a numeric value`
      );
    }

    const embedData = new Discord.MessageEmbed()
      .setColor("#ff4444")
      .setTitle("Sell now cost analysis")
      .setDescription(
        `Profit if you were to sell ${amount} turnips at ${price} each`
      )
      .setAuthor(username);

    if (cost.hasOwnProperty(sunday)) {
      const lastSunday = cost[sunday];
      if (lastSunday.hasOwnProperty(username)) {
        const cost = lastSunday[username];
        const totalCost = cost * amount;
        const totalRetail = price * amount;
        const totalProfit = totalRetail - totalCost;
        const totalPercent = Math.floor((totalRetail / totalCost) * 100) - 100;

        embedData.addFields(
          { name: "Total Cost", value: totalCost, inline: true },
          { name: "Total Retail", value: totalRetail, inline: true },
          { name: "Total Profit", value: totalProfit, inline: true },
          {
            name: "Percent " + getArrow(totalPercent),
            value: totalPercent + "%",
            inline: true,
          }
        );
        return message.reply(embedData);
        // return message.reply(
        //   `If you were to sell now you would make ${totalRetail} bells,  your profit would be ${totalProfit} bells that is a ${totalPercent}% profit of your initial ${totalCost} purchase!`
        // );
      }
    }
    return message.reply(
      `Could not calculate the profit you would make, ${args[0]} & ${args[1]} must be numeric values. \n Or you do not have an entry for last Sunday.\n Use !buy for more info`
    );
  },
};
