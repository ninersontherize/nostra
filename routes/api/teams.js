const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Team = require("../../models/Team");
const Tournament = require("../../models/Tournament");

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

  if ( isEmpty(req.query) ) {
    Team.find().then( teams => res.json(teams)).catch(err => console.log(err));
  } else {
    Team.find({$or: [{ name: new RegExp(req.query.search) }, { tournament_name: new RegExp(req.query.search) }] })
        .then( teams => res.json(teams)).catch(err => console.log(err));
  }

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

// @route PUT api/tournaments/:id/editTeam
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
        logo_small: req.body.logo_small,
        wins: req.body.wins,
        losses: req.body.losses
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

module.exports = router;
