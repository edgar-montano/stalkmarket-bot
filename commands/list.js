const loadData = require("../utils/loadData");
module.exports = {
  name: "list",
  description:
    "*Usage: `!list`\nList all previous sell values. This functionality doesn't use Discord embed API, so text is formatted differently.*",
  args: false,
  execute(message, args) {
    const data = loadData();
    message.channel.send(`\t\t**Sell value of Turnips**\n\`\`\`${data}\`\`\``);
  },
};
