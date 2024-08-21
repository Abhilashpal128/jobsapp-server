const mongoose = require("mongoose");

function DBconnection(url) {
  return mongoose.connect(url);
}
module.exports = {
  DBconnection,
};
