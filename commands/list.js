const loadWeek = require("../utils/loadWeek");
const initializeDay = require("../utils/initializeDay");
const getLastSunday = require("../utils/getLastSunday");
const cost = require("../data/cost.json");
module.exports = {
  name: "list",
  description: "*Usage: `!list`\nList all previous sell values for the week.*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    initializeDay();
    const data = loadWeek(username);
    let sunday = getLastSunday();
    if (cost.hasOwnProperty(sunday)) {
      if (cost[sunday].hasOwnProperty(username))
        data.addField("Cost of initial purchase", cost[sunday][username]);
    }
    message.channel.send(data);
  },
};
