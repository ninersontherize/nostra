const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const validateCreateLeagueInput = require("../../validation/league/createLeague");
const validateDeleteLeagueInput = require("../../validation/league/deleteLeague");

const League = require("../../models/League");
const UserLeague = require("../../models/UserLeague");

// @route POST api/leagues/createLeague
// @desc Create League
// @access Public
router.post("/createLeague", (req, res) => {
  const { errors, isValid } = validateCreateLeagueInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var creating_user_id = req.body.user_id;

  League.findOne({ name: req.body.name }).then( league => {
    if (league) {
      return res.status(400).json({ league: "League name must be unique, a league with this name already exists." });
    } else {
      const new_league = new League({
        name: req.body.name,
        game: req.body.game,
        leagues_supported: req.body.leagues_supported,
        private: req.body.private,
        max_players: req.body.max_players,
        starting_cash: req.body.starting_cash,
        in_progress: req.body.in_progress,
        league_owner: req.body.creating_user_id
      });

      new_league.save().then(league => {
        const new_user_league = new UserLeague({
          user_id: creating_user_id,
          league_id: league._id,
          user_bankroll: league.starting_cash,
        });

        new_user_league.save().then(user_league => res.json(user_league)).catch(err => console.log(err));
        res.json(league);
      }).catch(err => console.log(err));
    }
  });
});

// @route GET api/leagues/leagues
// @desc show leagues through search or if body is empty show all leagues
// @access public
router.get("/leagues", (req, res) => {
  if ( isEmpty(req.query) ) {
    League.find().then( leagues => res.json(leagues)).catch(err => console.log(err));
  } else {
    League.find({ name: new RegExp(req.query.search) }).then( leagues => res.json(leagues)).catch(err => console.log(err));
  }
});

// @route GET api/leagues/:id/leagues
// @desc show a single league through search or if body is empty show all leagues
// @access public
router.get("/:id/leagues", (req, res) => {
  var id = req.params.id;

  League.findOne({ _id: id }).then( league => {
    if (!league) {
      return res.status(404).json({ league: "League cannot be found, please try again."});
    } else {
      res.json(league);
    }
  }).catch(err => console.log(err));
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

// @route PUT api/leagues/:id/editLeague
// @desc Edit a league by id
// @access public
router.put("/:id/editLeague", (req, res) => {
  const { errors, isValid } = validateCreateLeagueInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var id = req.params.id;
  
  League.findOne({ _id: id }).then( league => {
    if (!league) {
      return res.status(404).json({ league: "That id does not exist, update failed" });
    } else {
      if (league.in_progress) {
        return res.status(400).json({ league: "Cannot edit a league that is currently in season" });
      } else {
        League.updateOne({ _id: id }, {
          name: req.body.name,
          game: req.body.game,
          leagues_supported: req.body.leagues_supported,
          private: req.body.private,
          max_players: req.body.max_players,
          starting_cash: req.body.starting_cash
        }, function(err, affected, res) {
          console.log(res);
        })
        .then(() => {
          console.log("league updated");
          res.status(200).send({ message: "league updated successfully"});
        });
      }  
    }
  });
});

// @route PUT api/leagues/:id/startSeason
// @desc Start a season in a league
// @access public
router.put("/:id/startSeason", (req, res) => {
  var id = req.params.id;

  League.findOne({ _id: id }).then( league => {
    if (!league) {
      return res.status(404).json({ league: "That id does not exist, season start failed" });
    } else {
      league_starting_cash = league.starting_cash;
      UserLeague.updateMany({ league_id: id }, {
        user_bankroll: league_starting_cash
      }, function(err, affected, res) {
        console.log(res);
      });

      League.updateOne({ _id: id }, {
        in_progress: true
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("Season Started!");
        res.status(200).send({ message: "Season started successfully!" });
      });
    }
  });
});

// @route PUT api/leagues/:id/endSeason
// @desc End a season in a league
// @access public
router.put("/:id/endSeason", (req, res) => {
  var id = req.params.id;

  League.findOne({ _id: id }).then( league => {
    if (!league) {
      return res.status(404).json({ league: "That id does not exist, season start failed" });
    } else {
      League.updateOne({ _id: id }, {
        in_progress: false
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("Season Ended!");
        res.status(200).send({ message: "Season ended successfully!" });
      });
    }
  });
});

// @route POST api/leagues/:league_id/:user_id/addUsertoLeague
// @desc Add a user to a league
// @access public
router.post("/addUserLeague", (req, res) => {
  var league_id = req.body.league_id;
  var user_id = req.body.user_id;

  League.findOne({ _id: league_id }).then( league => {
    if (!league) {
      return res.status(404).json({ league: "That league id does not exist, add User failed" });
    } else {
      User.findOne({ _id: user_id }).then( user => {
        if (!user) {
          return res.status(404).json({ league: "That user id does not exist, add User failed" });
        } else {
          UserLeague.findOne({ league_id: league_id, user_id: user_id }).then( user_league => {
            if (user_league) {
              res.status(200).json({ league: "This user is already a part of that league."});
            } else {
              const new_user_league = new UserLeague({
                user_id: user_id,
                league_id: league_id,
                user_bankroll: league.starting_cash,
              });
    
              new_user_league.save().then(user_league => res.json(user_league)).catch(err => console.log(err));
            }
          });
        }
      });
    }
  });
});

// @route DELETE api/leagues/:league_id/:user_id/removeUserLeague
// @desc Remove a user from a league
// @access public
router.delete("/removeUserLeague", (req, res) => {
  var league_id = req.body.league_id;
  var user_id = req.body.user_id;

  UserLeague.findOne({ league_id: league_id, user_id: user_id }).then( user_league => {
    if (!user_league) {
      return res.status(404).json({ user_league: "Submitted user does not exist in that league." });
    } else {
      UserLeague.deleteOne({ _id: user_league.id }).then( user_league => console.log(user_league));
      return res.status(200).json({ league: "User successfully removed from League" });
    }
  });
});

// @route GET api/leagues/getCurrentPlayers
// @desc Get the number of players currently in a league
// @access public
router.get("/getCurrentPlayers", (req, res) => {
  var league_id = req.query.league_id

  UserLeague.find({ league_id: league_id }).count().then(count => {
    return res.status(200).json(count);
  });
});

// @route PUT api/leagues/updateBankroll
// @desc Update bankroll after given win or loss
// @access public
router.put("/updateBankroll", (req, res) => {
  var league_id = req.body.league_id;
  var user_id = req.body.user_id;
  var change = req.body.change;

  UserLeague.findOne({ league_id: league_id, user_id: user_id }).then( user_league => {
    if (!user_league) {
      return res.status(404).json({ user_league: "Submitted user does not exist in that league." });
    } else {
      UserLeague.updateOne({ _id: user_league.id }, { 
        user_bankroll: (user_league.user_bankroll + change)
      }, function(err, affected, res) {
        console.log(res);
      }).then( user_league => {
        console.log(user_league);
      });
      return res.status(200).json(user_league);
    }
  });
});

module.exports = router;
