const getDate = require("../utils/getDate");
/**
 *
 * Gets the current day, used to indicate what day the bot is on.
 */
module.exports = {
  name: "day",
  description: "*Usage: `!day`\nGets the current day the bot is on..*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    message.channel.send(getDate(username).toDateString());
  },
};
