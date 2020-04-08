const morning = require('../data/price_am.json');
const afternoon = require('../data/price_pm.json');

/**
 * Check if the current day is valid.
 * @param {String} date - the date you wish to check
 * @param {String} timeOfDay - 'am' or 'pm' is valid strings
 * @return {Boolean} - returns true if the day has a value.
 */
module.exports = checkDay = (date, timeOfDay) => {
    const partOfDay = timeOfDay==='am' ? morning :  afternoon;
    if(partOfDay.hasOwnProperty(date)) return true;
    return false;
}
