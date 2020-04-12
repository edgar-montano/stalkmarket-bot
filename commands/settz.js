// const initializeDay = require("../utils/initializeDay");
const fs = require("fs");
const getUTC = require("../utils/getUTC");
const timezone = require("../data/timezone.json");
/**
 * Attempts to set the timezone of the user with an offset.
 * @param {timeZoneOffset} - offset of timezone, e.g. -4 for ny.
 */
module.exports = {
  name: "settz",
  description:
    "*Usage: `!settz OFFSET`\nSets your current UTC timezone based on offset, e.g. -4 for NY*",
  args: true,
  execute(message, args) {
    const username = message.author.username.slice(0, 5);
    const utc = getUTC(args[0]); //timezoneoffset
    if (utc === false)
      return message.reply(
        `The value you entered, ${args[0]} is not a valid input for this function. Please make sure you enter a number within the range -11 to 11`
      );

    timezone[username] = args[0];
    fs.writeFile(
      __dirname + "/../data/timezone.json",
      JSON.stringify(timezone),
      (err) => {
        if (err) {
          console.error(err);
          return message.reply(`Could not write your timezone to file`);
        }
      }
    );
    console.log(
      `${username} written to timezone for ${utc.toString()} for value ${
        args[0]
      }`
    );
    return message.reply(
      `Written your timezone value successfully for: UTC-${
        args[0]
      } your current UTC time string should now be: ${utc.toString()}`
    );
  },
};
