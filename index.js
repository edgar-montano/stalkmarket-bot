const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");

client.login(token);

//modular approach for commands
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./command/${file}`);
  client.commands.set(command.name, command);
}

const stalks = {};

client.once("ready", () => {
  console.log("Bot has successfully logged in.");
});

client.on("message", (message) => {
  const { username } = message.author;
  const msg = message.content.toLowerCase();

  if (!msg.startsWith(prefix) || message.author.bot) return;

  //extract command and arguments for message
  let args = msg.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  //return if command doesn't exist.
  if (!client.commands.has(commandName)) return;

  //attempt to execute query and execute command.
  const command = client.commands.get(commandName);
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    //add usage later.
    message.reply("Hm, that doesn't seem right...");
  }
});
