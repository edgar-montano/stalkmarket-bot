// const data = require("../data/data.json");
const writeData = require("../utils/writeData");
// const loadData = require("../utils/loadData");

module.exports = {
  name: "add",
  args: true,
  description: "Add a new price value for today.",
  execute(message, args) {
    let price = parseInt(args[0]);
    if (isNaN(price)) message.channel.send(`${args[0]} is not a number.`);
    if (!writeData(message.author.username.slice(0, 5), price)) {
      message.channel.send(
        "Price has been updated correctly, please use !today to see more information."
      );
    } else {
      message.channel.send("An error has occured... something went wrong.");
    }
  },
};
