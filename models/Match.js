const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({
  tournament: {
    type: Object,
    required: true
  },
  home_team: {
    type: Object,
    required: true
  },
  away_team: {
    type: Object,
    required: true
  },  
  money_line_home: {
    type: Number,
    required: false
  },
  money_line_away: {
    type: Number,
    required: false
  },
  spread_home: {
    type: Number,
    required: false
  }, 
  spread_away: {
    type: Number,
    required: false
  },
  winning_id: {
    type: String,
    required: false
  },
  losing_id: {
    type: String,
    required: false
  },
  gold_difference: {
    type: Number,
    required: false
  },
  match_date: {
    type: Date,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Match = mongoose.model("matches", MatchSchema);