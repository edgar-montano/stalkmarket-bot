/**
 * Returns an arrow corresponding to the sign of the interger passed.
 * @param {Number} price - numeric value either positive or negative representing price.
 * @return {String} arrow - either up or down ascii character
 */

module.exports = getArrow = (price) => {
  console.log(`Price is ${price}`);
  return parseInt(price) > 0 ? " ↑ " : " ↓ ";
};
