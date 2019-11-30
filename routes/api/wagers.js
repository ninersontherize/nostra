const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Wager = require("../../models/Wager");
const Match = require("../../models/Match");
const UserLeague = require("../../models/UserLeague");

// @route POST api/wagers/createWager
// @desc Create New Wager
// @access Public
router.post("/createWager", (req, res) => {

  UserLeague.findOne({ _id: req.body.wager_user_league }).then(user_league => {
    if (!user_league) {
      return res.status(404).json({ home_team: "Submitted user is not part of that league, please double check and try again" });
    } else {
      if (req.body.wager_amount > user_league.user_bankroll) {
        return res.status(400).json({ amount: "Amount submitted is more that the user has available." });
      } else {
        Match.findOne({ _id: req.body.wager_match }).then(match => {
          if (!match) {
            return res.status(404).json({ match: "Match not found, please double check and try again." });
          } else {
            const new_wager = new Wager({
              user_league: user_league,
              match: match,
              team_id: req.body.wager_team,
              amount: req.body.wager_amount,
              wager_type: req.body.wager_type,
              odds: req.body.wager_odds
            });

            new_wager.save().then(wager => {
              UserLeague.updateOne({_id: user_league._id}, {
                user_bankroll: user_league.user_bankroll - req.body.wager_amount
              }, function(err, affected, res) {
                console.log(res);
              });
              res.json(wager);
            }).catch(err => console.log(err));
          }
        });
      }
    }
  });
  
});

// @route GET api/wagers/wagers
// @desc show all wagers
// @access public
router.get("/wagers", (req, res) => {

  Wager.find().then( wagers => res.json(wagers)).catch(err => console.log(err));

});

// @route GET api/wagers/:id/wagers
// @desc show a single wager through url id
// @access public
router.get("/:id/wagers", (req, res) => {

  var id = req.params.id;

  Wager.findOne({ _id: id }).then( wager => {
    if (!wager) {
      return res.status(404).json({ wager: "Wager cannot be found, please try again."});
    } else {
      res.json(wager);
    }
  }).catch(err => console.log(err));

});

// @route DELETE api/wagers/deleteWager
// @desc Delete a wager by id
// @access private - backend only


//TODO: come back and add checks to date to see if valid delete
//also need to add money back to acct in case of cancelled bet.


router.delete("/:id/deleteWager", (req, res) => {

  var id = req.params.id;

  Wager.findOne({ _id: id }).then( wager => {
    if (!wager) {
      return res.status(404).json({ wager: "That id does not exist, delete failed" });
    } else {
      Wager.deleteOne({ _id: id }).then( wager => console.log(wager));
      return res.status(200).json({ wager: "Wager successfully deleted" });
    }
  });

});

module.exports = router;
