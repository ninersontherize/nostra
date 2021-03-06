const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Team = require("../../models/Team");
const Tournament = require("../../models/Tournament");
const Match = require("../../models/Match");

// @route POST api/teams/createTeam
// @desc Create Team
// @access Private - backend only
router.post("/createTeam", (req, res) => {
  
  Tournament.findOne({ _id: req.body.tournament_id }).then( tournament => {
    if (!tournament) {
      return res.status(400).json({ league: "Teams must belong to a valid tournament, the id you entered does not exist." });
    } else {
      Team.findOne({ name: req.body.name }).then( team => {
        if (team) {
          return res.status(400).json({ league: "Team name must be unique, a team with this name already exists." });
        } else {
          const new_team = new Team({
            name: req.body.name,
            short_name: req.body.short_name,
            tournament: tournament,
            logo_large: req.body.logo_large,
            logo_small: req.body.logo_small,
            wins: 0,
            losses: 0
          });
    
          console.log(new_team);
    
          new_team.save().then(team => res.json(team)).catch(err => console.log(err));
        }
      });
    }
  });

});

// @route GET api/teams/teams
// @desc show teams through search or if body is empty show all teams
// @access public
router.get("/teams", (req, res) => {

  if ( isEmpty(req.query || req.query.search === "" ) ) {
    Team.find().then( teams => res.json(teams)).catch(err => console.log(err));
  } else {
    Team.find({$or: [{ name: new RegExp(req.query.search) }, { tournament_name: new RegExp(req.query.search) }] })
        .then( teams => res.json(teams)).catch(err => console.log(err));
  }

});

// @route GET api/teams/:id/team
// @desc show a single team
// @access public
router.get("/:id/showTeam", (req, res) => {
  
  var id = req.params.id;
  Team.findOne({ _id: id }).then(team => res.json(team)).catch(err => console.log(err));

});

// @route DELETE api/teams/deleteTeam
// @desc Delete a team by id
// @access private - backend only
router.delete("/deleteTeam", (req, res) => {

  Team.findOne({ _id: req.body.id }).then( team => {
    if (!team) {
      return res.status(404).json({ team: "That id does not exist, delete failed" });
    } else {
      Team.deleteOne({ _id: req.body.id }).then( team => console.log(team));
      return res.status(200).json({ team: "Team successfully deleted" });
    }
  });

});

// @route PUT api/teams/:id/editTeam
// @desc Edit a team by id
// @access private - backend only
router.put("/:id/editTeam", (req, res) => {

  var id = req.params.id;
  
  Team.findOne({ _id: id }).then( team => {
    if (!team) {
      return res.status(404).json({ team: "That id does not exist, update failed" });
    } else {  
      Team.updateOne({ _id: id }, {
        name: req.body.name,
        short_name: req.body.short_name,
        logo_large: req.body.logo_large,
        logo_small: req.body.logo_small
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("team updated");
        res.status(200).send({ message: "team updated successfully"});
      });
    }
  });

});

// @route PUT api/teams/:id/updateRecord
// @desc Update a team's record by id
// @access public
router.put("/:id/updateRecord", (req, res) => {
  console.log(req.params.id);
  
  var team_id = req.params.id;
  var wins;
  var losses;

  Team.findOne({ _id: team_id }).then( team => {
    if (!team) {
      return res.status(404).json({ team: "That id does not exist, update failed" });
    } else { 
      Match.find({ winning_id: team._id, "tournament.split": team.tournament.split }).count().then(count => {
        wins = count;
        Match.find({ losing_id: team._id, "tournament.split": team.tournament.split }).count().then(count => {
          losses = count;
          Team.updateOne({ _id: team._id }, {
            wins: wins,
            losses: losses
          }, function(err, affected, res) {
            console.log(res);
          })
          .then(() => {
            console.log(wins);
            console.log(losses);
            res.status(200).send({ message: "record updated successfully"});
          });
        });
      });
    }
  });

}); 

// @route Get api/teams/:id/getRecordVsSpread
// @desc Update a team's record by id
// @access public
router.put("/:id/updateRecordVsSpread", (req, res) => {
  console.log(req.params.id);
  
  var team_id = req.params.id;
  var wins = 0;
  var losses = 0;
  var items_processed = 0;
  

  Team.findOne({_id: team_id }).then( team => {
    console.log(team);
    Match.find({ $or:[{"home_team.short_name": team.short_name, winning_id: {$ne: null} }, {"away_team.short_name": team.short_name, winning_id: {$ne: null} }]}).then(matches => {
      matches.forEach(match_item => {
        Match.findOne({_id: match_item._id}).then(match => {
          if(match.home_team._id.toString() == team._id.toString()){ 
            if(match.winning_id === team_id) {
              if(match.gold_difference > (match.spread_home*-1)) {
                wins++;
              } else {
                losses++;
              }
            } else {
              if(match.spread_home < 0) {
                losses++;
              } else if (match.spread_home > match.gold_difference) {
                wins++;
              } else {
                losses++;
              }
            }
          } else {
            if(match.winning_id === team_id) {
              if(match.gold_difference > (match.spread_away*-1)) {
                wins++;
              } else {
                losses++;
              }
            } else {
              if(match.spread_away < 0) {
                losses++;
              } else if (match.spread_away > match.gold_difference) {
                wins++;
              } else {
                losses++
              }
            }
          }
          items_processed++;
          if (items_processed === matches.length) {
            Team.updateOne({ _id: team._id }, {
              winsVsSpread: wins,
              lossesVsSpread: losses
            }, function(err, affected, res) {
              console.log(res);
            })
            .then(() => {
              console.log(wins);
              console.log(losses);
              res.status(200).send({ message: "record updated successfully"});
            });
          }
        });
      });
    });
  });

}); 

module.exports = router;
