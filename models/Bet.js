const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BetSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  league_id: {
    type: String,
    required: true
  },
  match_id: {
    type: String,
    required: true
  }, 
  team_id: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  win: {
    type: Boolean,
    required: false
  },  
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Bet = mongoose.model("bets", BetSchema);