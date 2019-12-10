const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FollowerSchema = new Schema({
  follower_id: {
    type: String,
    required: true
  },
  followee_id: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Follower = mongoose.model("followers", FollowerSchema);