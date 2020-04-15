const cost = require("../data/cost.json");
const Discord = require("discord.js");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const puppeteer = require("puppeteer");
const loadSpecificDay = require("../utils/loadSpecificDayTime");
const getDate = require("../utils/getDate");
const getLastSunday = require("../utils/getLastSunday");
module.exports = {
  name: "acturnip",
  description:
    "*Usage: `!acturnip`\nQuery ac-turnip.com and send a link for user to view.*",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);

    const embedData = new Discord.MessageEmbed()
      .setColor("#00FF00")
      .setAuthor("Stalk Market Price Predictation Wizard");
    const date = getDate(username);
    const day = date.getDay();
    const json = {};

    let weekDays =
      Object.keys(morning).length > Object.keys(afternoon).length
        ? Object.keys(morning)
        : Object.keys(afternoon);
    // const weekDays.map()

    console.log(weekDays, day);
    let totalDays = weekDays.slice(-day).forEach((key) => {
      let date = new Date(key);
      switch (date.getDay()) {
        case 1:
          json["monam"] = loadSpecificDay(username, key, "am");
          json["monpm"] = loadSpecificDay(username, key, "pm");
          break;
        case 2:
          json["tueam"] = loadSpecificDay(username, key, "am");
          json["tuepm"] = loadSpecificDay(username, key, "pm");
          break;
        case 3:
          json["wedam"] = loadSpecificDay(username, key, "am");
          json["wedpm"] = loadSpecificDay(username, key, "pm");
          break;
        case 4:
          json["thuam"] = loadSpecificDay(username, key, "am");
          json["thupm"] = loadSpecificDay(username, key, "pm");
          break;
        case 5:
          json["friam"] = loadSpecificDay(username, key, "am");
          json["fripm"] = loadSpecificDay(username, key, "pm");
          break;
        case 6:
          json["satam"] = loadSpecificDay(username, key, "am");
          json["satpm"] = loadSpecificDay(username, key, "pm");
          break;
        default:
          break;
      }
    });

    const values = [
      "monam",
      "monpm",
      "tueam",
      "tuepm",
      "wedam",
      "wedpm",
      "thuam",
      "thupm",
      "friam",
      "fripm",
      "satam",
      "satpm",
    ];
    // let link =
    //   "https://ac-turnip.com/#69,50,51,60,61,70,71,80,81,90,91,100,101";
    let links = `https://ac-turnip.com/#${cost[getLastSunday()][username]},`;
    for (let index = 0; index < values.length; index++) {
      if (json.hasOwnProperty(values[index]) && values[index] !== "satpm")
        links = links + json[values[index]] + ",";
      else if (json.hasOwnProperty(values[index]) && values[index] === "satpm")
        links = links + json[values[index]];
      else links = links + ",";
    }

    (async () => {
      // 1. Launch the browser
      const browser = await puppeteer.launch();

      // 2. Open a new page
      const page = await browser.newPage();

      // 3. Navigate to URL
      await page.goto(links);

      const pathName =
        "./screenshots/" +
        username +
        "-" +
        new Date().getTime() +
        "-screenshot.png";

      // 4. Take screenshot
      await page.screenshot({
        path: pathName,
      });

      await browser.close();
      console.log(pathName, json);
      embedData.attachFiles(pathName);
      embedData.setFooter("Source from AC-Turnip.com");
      embedData.setDescription(links);
      message.channel.send(embedData);
    })();
  },
};
