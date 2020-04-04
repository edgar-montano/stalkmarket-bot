const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");

client.login(token);

const stalks = {};

client.once("ready", () => {
  console.log("Bot has successfully logged in.");
});

client.on("message", (message) => {
  msg = message.content.toLowerCase();
  if (!msg.startsWith(prefix) || message.author.bot) return;
  let args = msg.slice(prefix.length).split(" ");
  let command = args.shift().toLowerCase();
  const { username } = message.author;
  //   console.log(args);
  //   console.log(`args: ${args}, command: ${command}, username: ${username}`);
});
