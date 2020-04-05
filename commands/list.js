const loadData = require("../utils/loadData");
module.exports = {
  name: "list",
  description: "List all values",
  args: false,
  execute(message, args) {
    const data = loadData();
    message.channel.send(`\t\t**Sell value of Turnips**\n\`\`\`${data}\`\`\``);
  },
};
