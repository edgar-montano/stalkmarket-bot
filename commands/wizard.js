const puppeteer = require("puppeteer");
const loadSpecificDay = require("../utils/loadSpecificDayTime");
const morning = require("../data/price_am.json");
const afternoon = require("../data/price_pm.json");
const Discord = require("discord.js");
module.exports = {
  name: "wizard",
  description:
    "*Usage: `!wizard`\nDoes price prediction based on your current weeks data.\n **NOTE: THIS IS AN EXPERIMENTAL FEATURE, PLEASE GIVE IT TIME TO EXECUTE** *",
  args: false,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);

    const embedData = new Discord.MessageEmbed()
      .setColor("#00FF00")
      .setAuthor("Stalk Market Price Predictation Wizard");

    const date = new Date();
    const day = date.getDay();
    const json = {};

    let weekDays =
      Object.keys(morning).length > Object.keys(afternoon).length
        ? Object.keys(morning)
        : Object.keys(afternoon);
    // const weekDays.map()
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
    // console.log(json);

    (async () => {
      let i = 1;
      const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true,
      }); // default is true

      // <login was successful>
      const page = await browser.newPage();
      await page.goto("https://kurtboyer.com/stalkmarket/", {
        waitUntil: "load",
      });

      const keys = Object.keys(json);
      for (key in json) {
        await page.click(`input[name='${key}']`);
        await page.keyboard.type(json[key].toString());
      }
      await page.waitFor(500);
      await page.click("input[src='images/getyourrecommendation.gif']");
      const recommendation = await page.evaluate(
        () => document.querySelector("a[name='recommendation']").innerText
      );
      const text = await page.evaluate(
        () => document.querySelector("p").innerText
      );
      const data = await page.evaluate(
        () => document.querySelectorAll("p")[2].innerText
      );
      embedData.addField("My recommendation", text);
      embedData.addField("Stalk Marker Wizard Data", data);
      embedData.setTitle(recommendation);
      embedData.addField("Data Points", JSON.stringify(json));
      console.log(recommendation, text, data);
      await browser.close();
      message.reply(embedData);
    })();

    // async login(){
    //   await page.goto();
    // }
    // message.channel.send(data);
  },
};
