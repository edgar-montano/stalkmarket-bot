const loadCost = require("../utils/loadCost");
const getLastSunday = require("../utils/getLastSunday");
const getDate = require("../utils/getDate");
module.exports = {
  name: "cost",
  description:
    "Usage: `!cost`\nLists the costs of turnips, this is only available on Sunday adds.",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    const date = getDate(username);
    const lastSunday =
      date.getDay() === 0 ? date.toDateString() : getLastSunday();
    const data = loadCost(lastSunday);
    message.channel.send(data.setTitle(`Cost of turnips for ${lastSunday}`));
  },
};
