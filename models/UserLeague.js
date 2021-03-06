const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserLeagueSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  league: {
    type: Object,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  user_bankroll: {
    type: Number,
    required: true
  },
  prev_week_bankroll: {
    type: Number,
    required: false
  },
  bankroll_percent_change: {
    type: Number,
    required: true
  },   
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserLeague = mongoose.model("userleagues", UserLeagueSchema);