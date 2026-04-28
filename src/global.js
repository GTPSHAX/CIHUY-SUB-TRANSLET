const AppLog = require('./lib/AppLog.js');

// Global var
let TOTAL_TRANSLATED = 0;

// Global instance
const appLog = new AppLog('Asia/Jakarta', 3);

module.exports = {
  TOTAL_TRANSLATED,

  appLog,
};
