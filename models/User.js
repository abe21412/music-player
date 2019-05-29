const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const trackSchema = require("./Track");

UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateRegisted: {
    type: Date,
    default: Date.now
  },
  tracks: {
    type: [trackSchema],
    default: []
  }
});

User = mongoose.model("users", UserSchema);
module.exports = User;
