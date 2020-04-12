const initializeDay = require("../utils/initializeDay");
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
        `The value you entered, ${args[0]}:${utc} is not a number`
      );
    console.log(utc.toString());
    return message.reply(utc.toString());
  },
};
