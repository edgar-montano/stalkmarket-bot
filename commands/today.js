const loadPrice = require("../utils/loadPrice");
module.exports = {
  name: "today",
  description:
    "*Usage: `!today`\nList current values for today, if value does not exist, please see `!price` function.*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    const day = loadPrice(username, false);
    message.channel.send(day);
  },
};
