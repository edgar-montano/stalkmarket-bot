const loadPrice = require("../utils/loadPrice");
const initializeDay = require("../utils/initializeDay");
module.exports = {
  name: "today",
  description:
    "*Usage: `!today`\nList current values for today, if value does not exist, please see `!sell` function.*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    initializeDay();
    const day = loadPrice(username, false);
    message.channel.send(day);
  },
};
