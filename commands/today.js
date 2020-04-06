const loadData = require("../utils/loadData");
module.exports = {
  name: "today",
  description:
    "*Usage: `!today`\nList current values for today, if value does not exist, please see `!add` function.*",
  args: false,
  execute(message, args) {
    let date = new Date().toDateString();
    const data = loadData(date);
    message.channel.send(`\`\`\`${date}\n-------------\n${data}\`\`\``);
  },
};
