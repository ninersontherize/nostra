const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MatchSchema = new Schema({
  tournament_id: {
    type: String,
    required: true
  },
  team_a_id: {
    type: String,
    required: true
  },
  team_b_id: {
    type: Array,
    required: true
  },   
  money_line: {
    type: String,
    required: false
  },
  spread: {
    type: Array,
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