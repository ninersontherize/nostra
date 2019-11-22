const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Tournament = require("../../models/Tournament");

// @route POST api/teams/createTournament
// @desc Create Tournament
// @access Private - backend only
router.post("/createTournament", (req, res) => {
  
  Tournament.findOne({ name: req.body.name }).then( tournament => {
    if (tournament) {
      return res.status(400).json({ league: "Tournament name must be unique, a tournament with this name already exists." });
    } else {
      const new_tourney = new Tournament({
        name: req.body.name,
        game: req.body.game,
        split: req.body.split
      });

      console.log(new_tourney);

      new_tourney.save().then(tournament => res.json(tournament)).catch(err => console.log(err));
    }
  });

});

// @route GET api/tournaments/tournaments
// @desc show tournaments through search or if body is empty show all tournaments
// @access public
router.get("/tournaments", (req, res) => {

  if ( isEmpty(req.query) ) {
    Tournament.find().then( tournaments => res.json(tournaments)).catch(err => console.log(err));
  } else {
    Tournament.find({$or: [{ name: new RegExp(req.query.search) }, { game: new RegExp(req.query.search) }] }).then( tournaments => res.json(tournaments)).catch(err => console.log(err));
  }

});

// @route DELETE api/tournaments/deleteTournament
// @desc Delete a tournament by id
// @access private - backend only
router.delete("/deleteTournament", (req, res) => {

  Tournament.findOne({ _id: req.body.id }).then( tournament => {
    if (!tournament) {
      return res.status(404).json({ tournament: "That id does not exist, delete failed" });
    } else {
      Tournament.deleteOne({ _id: req.body.id }).then( tournament => console.log(tournament));
      return res.status(200).json({ tournament: "Tournament successfully deleted" });
    }
  });

});

// @route PUT api/tournaments/:id/editTournament
// @desc Edit a tournament by id
// @access private - backend only
router.put("/:id/editTournament", (req, res) => {

  var id = req.params.id;
  
  Tournament.findOne({ _id: id }).then( tournament => {
    if (!tournament) {
      return res.status(404).json({ tournament: "That id does not exist, update failed" });
    } else {  
      Tournament.updateOne({ _id: id }, {
        name: req.body.name,
        game: req.body.game,
        split: req.body.split
      }, function(err, affected, res) {
        console.log(res);
      })
      .then(() => {
        console.log("league updated");
        res.status(200).send({ message: "league updated successfully"});
      });
    }
  });

});

module.exports = router;
