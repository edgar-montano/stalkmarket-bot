const fs = require("fs");
const { prefix } = require("../config.json");
module.exports = {
  name: "help",
  args: false,
  description: "Gives a list of the available commands.",
  execute(message, args) {
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    let commands = commandFiles.map(
      (command) => "`" + prefix + command.slice(0, command.length - 3) + "`"
    );
    let usage = "The following commands can be used: " + commands;
    message.channel.send(usage);
  },
};
