const loadCost = require("../utils/loadCost");
module.exports = {
  name: "cost",
  description:
    "Usage: `!cost`\nLists the costs of turnips, this is only available on Sunday adds.",
  args: false,
  execute(message, args) {
    const data = loadCost();
    message.channel.send(data);
  },
};
