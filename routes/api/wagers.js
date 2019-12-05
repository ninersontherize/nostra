const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const Wager = require("../../models/Wager");
const Match = require("../../models/Match");
const Team = require("../../models/Team");
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
            if (match.winning_id !== null) {
              return res.status(400).json({ match: "Cannot place wager on match that is already complete." });
            } else {
              const new_wager = new Wager({
                user_league_id: req.body.wager_user_league,
                match_id: req.body.wager_match,
                match: match,
                team_id: req.body.wager_team,
                amount: req.body.wager_amount,
                wager_type: req.body.wager_type,
                odds: req.body.wager_odds,
                win: null,
                closed: null
              });
  
              new_wager.save().then(wager => {
                UserLeague.updateOne({_id: user_league._id}, {
                  user_bankroll: (user_league.user_bankroll - req.body.wager_amount),
                  bankroll_percent_change: ((((user_league.user_bankroll - req.body.wager_amount)/user_league.league.starting_cash)*100)-100)
                }, function(err, affected, res) {
                  console.log(res);
                });
                res.json(wager);
              }).catch(err => console.log(err));
            }
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

// @route GET api/wagers/:id/myWagers
// @desc given a user_id, return all wagers related to that id
// @access public
router.get("/:id/myWagers", (req, res) => {

  var id = req.params.id;

  UserLeague.find({ user_id: id }).distinct("_id",{}).then( user_leagues => {
    console.log(user_leagues);  
    Wager.find({ user_league_id: { $in: user_leagues }}).sort({"match.match_date": 1}).then( wagers => res.json(wagers)).catch(err => console.log(err));
  });

});


// @route DELETE api/wagers/adminDeleteWager
// @desc Delete a wager by id --- FOR DEVELOPMENT ONLY
// @access private - backend only
router.delete("/:id/adminDeleteWager", (req, res) => {

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

// @route DELETE api/wagers/deleteWager
// @desc Delete a wager by id
// @access public
router.delete("/:id/deleteWager", (req, res) => {

  var id = req.params.id;

  Wager.findOne({ _id: id }).then( wager => {
    if (!wager) {
      return res.status(404).json({ wager: "That id does not exist, delete failed" });
    } else {
      Match.findOne({ _id: wager.match_id }).then( match => {
        if (match.match_date < Date.now() || wager.closed === true) {
          return res.status(400).json({ wager: "Sorry, cannot delete a wager that has already been closed." });
        } else {
          UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
            var new_bankroll = user_league.user_bankroll + wager.amount;
            UserLeague.updateOne({ _id: user_league._id }, {
              user_bankroll: new_bankroll,
              bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100)
            }, function(err, affected, res) {
                    console.log(res);
            });
          });
  
          Wager.deleteOne({ _id: id }).then( wager => console.log(wager));
          return res.status(200).json({ wager: "Wager successfully deleted" });
        }
      }); 
    }
  });

});

// @route PUT api/wagers/:id/resolveWagers
// @desc given a match id, resolve all wagers related to that id
// @access public
router.put("/:id/resolveWagers", (req, res) => {
  
  var id = req.params.id;

  Match.findOne({ _id: id}).then( match => {
    if (!match) {
      return res.status(404).json({ match: "Sorry that match cannot be found, double check and try again" });
    } else if (match.winning_id === null ) {
      return res.status(400).json({ match: "Match has not been completed yet."})
    } else {
      Wager.find({ match_id: id }).then( wagers => {
        wagers.forEach( wager => {
          if (wager.closed === true) {
            return
          }
          if (wager.wager_type === "money_line") {
            if (wager.odds < 0) {
              //favorite logic
              if (wager.team_id === match.winning_id) {
                //win logic
                var payout = (((100/Math.abs(wager.odds))*wager.amount)+wager.amount);

                UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
                  var new_bankroll = user_league.user_bankroll + payout;
                  
                  UserLeague.updateOne({ _id: user_league.id}, {
                    user_bankroll: new_bankroll,
                    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100)
                  }, function(err, affected, res) {
                    console.log(res);
                  });

                  Wager.updateOne({ _id: wager._id }, {
                    win: true,
                    closed: true
                  }, function(err, affected, res) {
                    console.log(res);
                  });
                  console.log("ryan");
                });                
              } else {
                //lose logic
                Wager.updateOne({ _id: wager._id }, {
                  win: false,
                  closed: true
                }, function(err, affected, res) {
                  console.log(res);
                });
              }
            } else {
              //underdog logic
              if (wager.team_id === match.winning_id) {
                //win logic
                var payout = (((wager.odds/100)*wager.amount)+wager.amount);

                UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
                  var new_bankroll = user_league.user_bankroll + payout;
                  
                  UserLeague.updateOne({ _id: user_league.id}, {
                    user_bankroll: new_bankroll,
                    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100)
                  }, function(err, affected, res) {
                    console.log(res);
                  });

                  Wager.updateOne({ _id: wager._id }, {
                    win: true,
                    closed: true
                  }, function(err, affected, res) {
                    console.log(res);
                  });
                });
              } else {
                //lose logic
                console.log("cjen");
                Wager.updateOne({ _id: wager._id }, {
                  win: false,
                  closed: true
                }, function(err, affected, res) {
                  console.log(res);
                });
              }
            }
          } else {
            if (wager.odds < 0) {
              //favorite logic
              if (wager.team_id === match.winning_id && match.gold_difference > Math.abs(wager.odds)) {
                //win logic
                var payout = (wager.amount*2);

                UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
                  var new_bankroll = user_league.user_bankroll + payout;
                  
                  UserLeague.updateOne({ _id: user_league.id}, {
                    user_bankroll: new_bankroll,
                    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100)
                  }, function(err, affected, res) {
                    console.log(res);
                  });

                  Wager.updateOne({ _id: wager._id }, {
                    win: true,
                    closed: true
                  }, function(err, affected, res) {
                    console.log(res);
                  });
                });
              } else {
                //lose logic
                Wager.updateOne({ _id: wager._id }, {
                  win: false,
                  closed: true
                }, function(err, affected, res) {
                  console.log(res);
                });
              }
            } else {
              //underdog logic
              if (wager.team_id === match.winning_id) {
                //win logic
                var payout = (wager.amount*2);

                UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
                  var new_bankroll = user_league.user_bankroll + payout;
                  
                  UserLeague.updateOne({ _id: user_league.id}, {
                    user_bankroll: new_bankroll,
                    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100)
                  }, function(err, affected, res) {
                    console.log(res);
                  });

                  Wager.updateOne({ _id: wager._id }, {
                    win: true,
                    closed: true
                  }, function(err, affected, res) {
                    console.log(res);
                  });
                });
              } else if (wager.team_id === match.losing_id && match.gold_difference < Math.abs(wager.odds)) {
                //win logic
                var payout = (wager.amount*2);

                UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
                  var new_bankroll = user_league.user_bankroll + payout;
                  
                  UserLeague.updateOne({ _id: user_league.id}, {
                    user_bankroll: new_bankroll,
                    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100)
                  }, function(err, affected, res) {
                    console.log(res);
                  });

                  Wager.updateOne({ _id: wager._id }, {
                    win: true,
                    closed: true
                  }, function(err, affected, res) {
                    console.log(res);
                  });
                });
              } else {
                //lose logic
                Wager.updateOne({ _id: wager._id }, {
                  win: false,
                  closed: true
                }, function(err, affected, res) {
                  console.log(res);
                });
              }
            }
          }
        });
        return res.status(200).json({ wager: "Wagers successfully resolved" });
      });
    }
  });
});

module.exports = router;
