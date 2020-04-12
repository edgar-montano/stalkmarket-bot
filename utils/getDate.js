const timezone = require("../data/timezone.json");
const getUTC = require("../utils/getUTC");
/**
 *
 * Either gets date according to UTC or gets current date.
 * @param {String} - username to check if they have a timezone set
 * @return {String} - toDateString of date object
 */
module.exports = getDate = (username) => {
  const date = timezone.hasOwnPropety(username)
    ? getUTC(timezone[username])
    : new Date();
  return date.toDateString();
};
