const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema for User model's tracks attribute
trackSchema = new Schema(
  {
    trackId: {
      type: ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: false
    },
    album: {
      type: String,
      required: false
    }
  },
  { _id: false }
);

module.exports = trackSchema;
