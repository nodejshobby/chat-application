const moment = require("moment");
const formatMessage = (userName, message) => {
  return {
    userName,
    message,
    time: moment().format("h:mm A"),
  };
};

module.exports = {
  formatMessage,
};
