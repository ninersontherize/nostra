const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WagerSchema = new Schema({
  user_league: {
    type: String,
    required: true
  },
  match: {
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
  wager_type: {
    type: String,
    required: true
  },
  odds: {
    type: String,
    required: true
  },
  win: {
    type: Boolean,
    required: false
  },
  closed: {
    type: Boolean,
    required: false
  },  
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Wager = mongoose.model("wagers", WagerSchema);