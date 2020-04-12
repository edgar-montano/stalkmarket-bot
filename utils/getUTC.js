/**
 * Get UTC returns back a new output date in a specified timezone
 * @param {Number} timeZoneOffset = offset of the timezone we desire
 * @param {Date} newDate - the new date value for our timezone
 */

module.exports = getUTC = (timeZoneOffset) => {
  if (!(0 <= parseInt(timeZoneOffset) <= 11)) return false;
  const current = new Date();
  const currentTimezone = -current.getTimezoneOffset() / 60; // convert to hours
  const timezoneDifference = timeZoneOffset - currentTimezone;
  const timezoneOffsetMs = timezoneDifference * 1000 * 60 * 60; //convert hours to ms
  const newDate = new Date(current.getTime() + timezoneOffsetMs);
  return newDate;
};
