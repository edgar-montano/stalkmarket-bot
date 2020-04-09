/**
 * Gets the current day, used to indicate what day the bot is on.
 */
module.exports = {
  name: "day",
  description: "*Usage: `!day`\nGets the current day the bot is on..*",
  args: false,
  execute(message, args) {
    message.channel.send(new Date().toDateString());
  },
};
