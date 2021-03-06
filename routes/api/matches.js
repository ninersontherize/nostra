const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Match = require("../../models/Match");
const Team = require("../../models/Team");

// @route POST api/matches/createMatch
// @desc Create Match
// @access Public
router.post("/createMatch", (req, res) => {

  Tournament.findOne({ _id: req.body.tournament_id }).then(tournament => {
    if (!tournament) {
      return res.status(404).json({ league: "Matches must take place in a valid tournament, please check tournament id and try again." });
    } else {
      console.log(tournament);
      Team.findOne({ _id: req.body.home_team_id, "tournament.name": tournament.name }).then(home_team => {
        if (!home_team) {
          return res.status(404).json({ home_team: "Home team must be a valid team, please check home team id and try again" });
        } else {
          Team.findOne({ _id: req.body.away_team_id, "tournament.name": tournament.name }).then(away_team => {
            if (!away_team) {
              return res.status(404).json({ away_team: "Away team must be a valid team, please check away team id and try again"})
            } else {
              Match.findOne({ tournament_id: req.body.tournament_id, home_team_id: req.body.home_team_id, away_team_id: req.body.away_team_id, match_date: req.body.match_date }).then( match => {
                if (match) {
                  return res.status(400).json({ league: "Match participants and date must be unique, please try again." });
                } else {
                  const new_match = new Match({
                    tournament: tournament,
                    home_team: home_team,
                    away_team: away_team,
                    money_line_home: req.body.money_line_home,
                    money_line_away: req.body.money_line_away,
                    spread_home: req.body.spread_home,
                    spread_away: req.body.spread_away,
                    winning_id: req.body.winning_id,
                    losing_id: req.body.losing_id,
                    gold_difference: req.body.gold_difference,
                    match_date: req.body.match_date
                  });
            
                  console.log(new_match);
            
                  new_match.save().then(match => res.json(match)).catch(err => console.log(err));
                }
              });
            }
          });
        }
      });
    }
  });
  
});

// @route POST api/matches/batchCreateMatch
// @desc Create Match
// @access Private - script use only
router.post("/batchCreateMatch", (req, res) => {

  req.body.forEach(match => {
    console.log(match.match_date);
    Tournament.findOne({ name: match.tournament, split: match.split }).then(tournament => {
      if (!tournament) {
        return res.status(404).json({ league: "Matches must take place in a valid tournament, please check tournament id and try again." });
      } else {
        Team.findOne({ short_name: match.home_team, "tournament.name": tournament.name }).then(home_team => {
          if (!home_team) {
            return res.status(404).json({ home_team: "Home team must be a valid team, please check home team id and try again" });
          } else {
            Team.findOne({ short_name: match.away_team, "tournament.name": tournament.name }).then(away_team => {
              if (!away_team) {
                return res.status(404).json({ away_team: "Away team must be a valid team, please check away team id and try again"})
              } else {
                Match.findOne({ tournament_id: tournament._id, home_team_id: home_team._id, away_team_id: away_team._id, match_date: match.match_date }).then( existing_match => {
                  if (existing_match) {
                    return res.status(400).json({ league: "Match participants and date must be unique, please try again." });
                  } else {
                    const new_match = new Match({
                      tournament: tournament,
                      home_team: home_team,
                      away_team: away_team,
                      money_line_home: null,
                      money_line_away: null,
                      spread_home: null,
                      spread_away: null,
                      winning_id: null,
                      losing_id: null,
                      gold_difference: null,
                      match_date: match.match_date
                    });
              
                    new_match.save().then(match => res.json(match)).catch(err => console.log(err));
                  }
                });
              }
            });
          }
        });
      }
    });
  });
  
});

// @route GET api/matches/matches
// @desc show matches through search or if query is empty show all matches
// @access public
router.get("/matches", (req, res) => {

  if ( isEmpty(req.query || req.query.search === "" ) ) {
    Match.find().sort({match_date: 1}).then(matches => res.json(matches)).catch(err => console.log(err));
  } else {
    if (isNaN(Date.parse(req.query.search))) {
      Match.find({$or: 
        [
          { "tournament.name": new RegExp(req.query.search) }, 
          { "home_team.name": new RegExp(req.query.search) }, 
          { "away_team.name": new RegExp(req.query.search) }, 
          { "home_team.short_name": new RegExp(req.query.search) }, 
          { "away_team.short_name": new RegExp(req.query.search) }
        ] }).sort({match_date: 1}).then( matches => res.json(matches)).catch(err => console.log(err));
    } else {
      Match.find({ match_date: Date.parse(req.query.search) }).sort({match_date: 1}).then( matches => res.json(matches)).catch(err => console.log(err));
    }
  }

});

// @route GET api/matches/matchesByDate
// @desc show matches in a given time period, if one of the date is left open show all matches to the left or right of the date
// @access public
router.get("/matchesByDate", (req, res) => {

  Match.find({$and: [{ match_date: { $gte: req.query.start_date } }, { match_date: { $lte: req.query.end_date } }] }).sort({match_date: req.query.order})
  .then( matches => res.json(matches)).catch(err => console.log(err));
  
});

// @route GET api/matches/:id/matches
// @desc show a single match through url param
// @access public
router.get("/:id/match", (req, res) => {

  var id = req.params.id;

  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "Match cannot be found, please try again." });
    } else {
      res.json(match);
    }
  }).catch(err => console.log(err));

});

// @route DELETE api/matches/deleteMatch
// @desc Delete a match by id
// @access private - backend only
router.delete("/deleteMatch", (req, res) => {

  Match.findOne({ _id: req.body.id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "That id does not exist, delete failed" });
    } else {
      Match.deleteOne({ _id: req.body.id }).then( match => console.log(match));
      return res.status(200).json({ match: "Match successfully deleted" });
    }
  });

});

// @route PUT api/matches/:id/updateMatchOdds
// @desc Update a match by id
// @access public
router.put("/:id/updateMatchOdds", (req, res) => {

  var id = req.params.id;
  
  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "That id does not exist, update failed" });
    } else {
      Match.updateOne({ _id: id }, {
        money_line_home: req.body.money_line_home,
        money_line_away: req.body.money_line_away,
        spread_home: req.body.spread_home,
        spread_away: req.body.spread_away,
        over_under_odds: req.body.over_under_odds
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("match updated");
        res.status(200).send({ message: "match updated successfully" });
      });
    }
  });

});

// @route PUT api/matches/:id/updateMatchOdds
// @desc Update a match by id
// @access public
router.put("/:id/updateMatchTime", (req, res) => {

  var id = req.params.id;
  
  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "That id does not exist, update failed" });
    } else {
      Match.updateOne({ _id: id }, {
        match_date: req.body.match_date
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("match updated");
        res.status(200).send({ message: "match updated successfully" });
      });
    }
  });

});

// @route PUT api/matches/getLatestTeams
// @desc Update a match participants
// @access public
router.put("/:id/getLatestTeams", (req, res) => {

  var id = req.params.id;

  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "That id does not exist, update failed" });
    } else {
      Team.findOne({ name: match.home_team.name }).then( home_team => {
        Team.findOne({ name: match.away_team.name }).then( away_team => {
          Match.updateOne({ _id: id }, {
            home_team: home_team,
            away_team: away_team
          }, function(err, affected, res) {
            console.log(res);
          })
          .then(() => {
            console.log("participants updated");
            res.status(200).send({ message: "participants updated successfully" });
          })
        });
      });
    }
  });

});

// @route PUT api/matches/:id/setResult
// @desc Update a match result
// @access public
router.put("/:id/setResult", (req, res) => {
  
  var id = req.params.id;

  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "That id does not exist, update failed" });
    } else {
      Match.updateOne({ _id: id }, {
        winning_id: req.body.winning_id,
        losing_id: req.body.losing_id,
        gold_difference: req.body.gold_difference,
        kills: req.body.kills
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        Team.findOne({ _id: req.body.winning_id }).then( winning_team => {
          Team.updateOne({ _id: req.body.winning_id }, {
            wins: winning_team.wins+1 
          }, function(err, affected, res) {
            console.log(res);
          });
          Team.findOne({ _id: req.body.losing_id }).then( losing_team => {
            Team.updateOne({ _id: req.body.losing_id }, {
              losses: losing_team.losses+1
            }, function(err, affected, res) {
              console.log(res);
            });
            console.log("result saved");
            res.status(200).send({ message: "result saved successfully" });
          });
        });   
      });
    }
  });

});

module.exports = router;
