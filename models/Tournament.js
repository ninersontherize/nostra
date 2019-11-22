const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TournamentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  }, 
  split: {
    type: String,
    required: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tournament = mongoose.model("tournaments", TournamentSchema);