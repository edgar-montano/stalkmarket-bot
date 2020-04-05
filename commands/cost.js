const loadCost = require("../utils/loadCost");
module.exports = {
  name: "cost",
  description: "List all values",
  args: true,
  execute(message, args) {
    const data = loadCost();
    console.log(`Data is ${data}`);
    message.channel.send(`\t\t**Cost of Turnips**\n\`\`\`${data}\`\`\``);
  },
};
