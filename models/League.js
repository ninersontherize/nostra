const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LeagueSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  },
  leagues_supported: {
    type: Array,
    required: true
  },    
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = League = mongoose.model("leagues", LeagueSchema);