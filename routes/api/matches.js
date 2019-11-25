const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Match = require("../../models/Match");

// @route POST api/matchess/createMatch
// @desc Create Match
// @access Public
router.post("/createMatch", (req, res) => {

  Tournament.findOne({ _id: req.body.tournament_id }).then(tournament => {
    if (!tournament) {
      return res.status(404).json({ league: "Matches must take place in a valid tournament, please check tournament id and try again." });
    } else {
      Team.findOne({ _id: req.body.home_team_id, tournament_id: tournament.id }).then(home_team => {
        if (!home_team) {
          return res.status(404).json({ home_team: "Home team must be a valid team, please check home team id and try again" });
        } else {
          Team.findOne({ _id: req.body.away_team_id, tournament_id: tournament.id }).then(away_team => {
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
                    spread: req.body.spread,
                    spread_favorite: req.body.spread_favorite,
                    winning_id: req.body.winning_id,
                    losing_id: req.body.losing_id,
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

// @route GET api/matches/matches
// @desc show matches through search or if query is empty show all matches
// @access public
router.get("/matches", (req, res) => {

  if ( isEmpty(req.query) ) {
    Match.find().sort({match_date: 1}).then(matches => res.json(matches)).catch(err => console.log(err));
  } else {
    if (isNaN(Date.parse(req.query.search))) {
      Match.find({$or: 
        [
          { tournament_name: new RegExp(req.query.search) }, 
          { home_team_name: new RegExp(req.query.search) }, 
          { away_team_name: new RegExp(req.query.search) }, 
          { home_team_short_name: new RegExp(req.query.search) }, 
          { away_team_short_name: new RegExp(req.query.search) }
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

  if ( isEmpty(req.query) ) {
    Match.find().then(matches => res.json(matches)).catch(err => console.log(err));
  } else if (isEmpty(req.query.end_date)) {
    console.log(req.query.start_date);
    Match.find({ match_date: { $gte: new Date(req.query.start_date) } }).sort({match_date: 1})
      .then( matches => res.json(matches)).catch(err => console.log(err));
  } else if (isEmpty(req.query.start_date)) {
    Match.find({ match_date: { $lte: new Date(req.query.end_date) } }).sort({match_date: 1})
      .then( matches => res.json(matches)).catch(err => console.log(err));
  } else {
    Match.find({$and: [{ match_date: { $gte: new Date(req.query.start_date) } }, { match_date: { $lte: new Date(req.query.end_date) } }] }).sort({match_date: 1})
      .then( matches => res.json(matches)).catch(err => console.log(err));
  }

});

// @route GET api/matches/:id/matches
// @desc show a single match through url param
// @access public
router.get("/:id/match", (req, res) => {

  var id = req.params.id;

  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "Match cannot be found, please try again."});
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

// @route PUT api/matches/:id/updateMatch
// @desc Update a match by id
// @access public
router.put("/:id/updateMatch", (req, res) => {

  var id = req.params.id;
  
  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "That id does not exist, update failed" });
    } else {
      Match.updateOne({ _id: id }, {
        money_line_home: req.body.money_line_home,
        money_line_away: req.body.money_line_away,
        spread: req.body.spread,
        spread_favorite: req.body.spread_favorite,
        winning_id: req.body.winning_id,
        losing_id: req.body.losing_id
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("match updated");
        res.status(200).send({ message: "match updated successfully"});
      });
    }
  });

});

module.exports = router;
