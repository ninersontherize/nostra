const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const validateCreateLeagueInput = require("../../validation/league/createLeague");
const validateDeleteLeagueInput = require("../../validation/league/deleteLeague");

const League = require("../../models/League");

// @route POST api/leagues/createLeague
// @desc Create League
// @access Public
router.post("/createLeague", (req, res) => {
  const { errors, isValid } = validateCreateLeagueInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  League.findOne({ name: req.body.name }).then( league => {
    if (league) {
      return res.status(400).json({ league: "League name must be unique, a league with this name already exists." });
    } else {
      const new_league = new League({
        name: req.body.name,
        game: req.body.game,
        leagues_supported: req.body.leagues_supported
      });

      new_league.save().then(league => res.json(league)).catch(err => console.log(err));
    }
  });
});

// @route GET api/leagues/leagues
// @desc show leagues through search or if body is empty show all leagues
// @access public
router.get("/leagues", (req, res) => {
  if ( isEmpty(req.body) ) {
    League.find().then( leagues => res.json(leagues)).catch(err => console.log(err));
  } else {
    League.find({ name: req.body.search }).then( leagues => res.json(leagues)).catch(err => console.log(err));
  }
});

// @route DELETE api/leagues/deleteLeague
// @desc Delete a league by id
// @access public
router.delete("/deleteLeague", (req, res) => {
  const { errors, isValid } = validateDeleteLeagueInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  League.findOne({ _id: req.body.id }).then( league => {
    if (!league) {
      return res.status(404).json({ league: "That id does not exist, delete failed" });
    } else {
      League.deleteOne({ _id: req.body.id }).then( league => console.log(league));
      return res.status(200).json({ league: "League successfully deleted" });
    }
  });
});

module.exports = router;
