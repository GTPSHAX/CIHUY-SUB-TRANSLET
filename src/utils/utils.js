/**
 * Simple delay function that returns a promise that resolves after a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const systemLog = (type, msg, details = '') => {
  
}

module.exports = {
  delay,
};
