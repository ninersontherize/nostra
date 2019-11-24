const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({
  tournament_id: {
    type: String,
    required: true
  },
  tournament_name: {
    type: String,
    required: true
  },
  home_team_id: {
    type: String,
    required: true
  },
  home_team_name: {
    type: String,
    required: true
  },
  home_team_short_name: {
    type: String,
    required: true
  },
  away_team_id: {
    type: String,
    required: true
  },
  away_team_name: {
    type: String,
    required: true
  },
  away_team_short_name: {
    type: String,
    required: true
  },   
  money_line: {
    type: String,
    required: false
  },
  spread: {
    type: String,
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