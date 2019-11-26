const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  short_name: {
    type: String,
    required: true
  },
  tournament: {
    type: Object,
    required: true
  },
  logo_large: {
    type: String,
    required: true
  },
  logo_small: {
    type: String,
    required: true
  },
  wins: {
    type: Number,
    required: true
  },
  losses: {
    type: Number,
    required: true
  },   
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Team = mongoose.model("teams", TeamSchema);