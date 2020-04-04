const loadData = require("../utils/loadData");
module.exports = {
  name: "today",
  description: "List current values for today",
  args: false,
  execute(message, args) {
    let date = new Date().toDateString();
    const data = loadData(date);
    message.channel.send(`\`\`\`${date}\n-------------\n${data}\`\`\``);
  },
};
