const loadWeek = require("../utils/loadWeek");
const initializeDay = require("../utils/initializeDay");
module.exports = {
  name: "list",
  description: "*Usage: `!list`\nList all previous sell values for the week.*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    initializeDay();
    const data = loadWeek(username);
    message.channel.send(data);
  },
};
