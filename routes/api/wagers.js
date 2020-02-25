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

  if (req.body.wager_user_league === "") {
    return res.status(400).json({ wager_league: "Please select a league to attribute this wager to."});
  } else if (req.body.wager_team === "") {
    return res.status(400).json({ wager_info: "Please select team to wager on."});
  } else if (req.body.wager_amount === "") {
    return res.status(400).json({ amount: "Please enter an amount for your wager." });
  } else if (req.body.wager_amount <= 0) {
    return res.status(400).json({ amount: "Wager amount must be above 0." });
  } else if (req.body.wager_odds === null || req.body.wager_odds === undefined) {
    return res.status(400).json({ wager_info: "Odds not set for this type/match yet." });
  }

  UserLeague.findOne({ _id: req.body.wager_user_league }).then(user_league => {
    if (!user_league) {
      return res.status(404).json({ wager_league: "Submitted user is not part of that league, please double check and try again" });
    } else {
      if (req.body.wager_amount > user_league.user_bankroll || req.body.wager_amount <= 0) {
        return res.status(400).json({ amount: "Amount submitted is more that the user has available." });
      } else {
        Match.findOne({ _id: req.body.wager_match }).then(match => {
          if (!match) {
            return res.status(404).json({ match: "Match not found, please double check and try again." });
          } else {
            if (new Date(match.match_date) < Date.now()) {
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
                payout: null,
                closed: null
              });
  
              new_wager.save().then(wager => {
                UserLeague.updateOne({_id: user_league._id}, {
                  user_bankroll: (user_league.user_bankroll - req.body.wager_amount),
                  bankroll_percent_change: ((((user_league.user_bankroll - req.body.wager_amount)/user_league.league.starting_cash)*100)-100).toFixed(2)
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

// @route GET api/wagers/:id/wagers
// @desc show wagers associated to match through url id
// @access public
router.get("/:id/wagersByMatch", (req, res) => {

  var id = req.params.id;

  Wager.find({ match_id: id, win: true }).sort({ payout: -1 }).limit(10).then( wagers => {
    res.json(wagers);
  }).catch(err => console.log(err));

});

// @route GET api/wagers/:id/wagers
// @desc show wagers associated to match through url id
// @access public
router.get("/:id/losingWagersByMatch", (req, res) => {

  var id = req.params.id;

  Wager.find({ match_id: id, win: false }).sort({ amount: -1 }).limit(10).then( wagers => {
    res.json(wagers);
  }).catch(err => console.log(err));

});

// @route GET api/wagers/:id/wagers
// @desc show wagers associated to match through url id
// @access public
router.get("/:id/adminWagersByMatch", (req, res) => {

  var id = req.params.id;

  Wager.find({ match_id: id }).then( wagers => {
    res.json(wagers);
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

// @route GET api/wagers/:id/myOpenWagers
// @desc given a user_id, return all wagers related to that id
// @access public
router.get("/:id/myOpenWagers", (req, res) => {

  var id = req.params.id;
  var user_league = req.query.user_league_id;

  if (user_league === "" || user_league === undefined) {
    UserLeague.find({ user_id: id }).distinct("_id",{}).then( user_leagues => { 
      Wager.find({ user_league_id: { $in: user_leagues }, closed: null }).sort({"created_date": -1}).then( wagers => res.json(wagers)).catch(err => console.log(err));
    });
  } else {
    Wager.aggregate([ {$match: {user_league_id: user_league, closed: null} }, {
      $group: {
        _id: { user_league: "$user_league_id" },
        wager_total: { $sum: "$amount"}
      }
    }]).then( wagers => res.json(wagers)).catch(err => console.log(err));
  }
  

});

// @route GET api/wagers/:id/myOpenWagers
// @desc given a user_id, return all wagers related to that id
// @access public
router.get("/:id/myClosedWagers", (req, res) => {

  var id = req.params.id;

  UserLeague.find({ user_id: id }).distinct("_id",{}).then( user_leagues => { 
    Wager.find({ user_league_id: { $in: user_leagues }, closed: true}).sort({"created_date": -1}).then( wagers => res.json(wagers)).catch(err => console.log(err));
  });

});

// @route GET api/wagers/:id/topLosses
// @desc given a user_id, return top 5 losses related to that id
// @access public
router.get("/:id/topLosses", (req, res) => {

  var id = req.params.id;

  UserLeague.find({ user_id: id }).distinct("_id", {}).then( user_leagues => {
    console.log(user_leagues);
    Wager.aggregate([
      {$match: {
        user_league_id: { $in: user_leagues.map(String) },
        win: false
      }}, 
      {$sort: {
        amount: -1
      }}
    ]).then( wagers => res.json(wagers)).catch(err => console.log(err));
  });

});

// @route GET api/wagers/:id/topWins
// @desc given a user_id, return top 5 wins related to that id
// @access public
router.get("/topWins/:id", (req, res) => {

  var id = req.params.id;

  UserLeague.find({ user_id: id }).distinct("_id", {}).then( user_leagues => {
    console.log(user_leagues);
    Wager.aggregate([
      {$match: {
        user_league_id: { $in: user_leagues.map(String) },
        win: true,
        payout: {$gt: 0}
      }},
      {$addFields: {
        total_payout: { $subtract: ["$payout","$amount"] }
      }}, 
      {$sort: {
        total_payout: -1
      }}
    ]).then( wagers => res.json(wagers)).catch(err => console.log(err));
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
      if (wager.match_id === "parlay") {
        wager.parlay_wagers.forEach(sub_wager => {
          console.log(sub_wager);
          Wager.findOne({ _id: sub_wager }).then(sub_bet => {
            Match.findOne({ _id: sub_bet.match_id }).then( match => {
              if (match.match_date < Date.now() || wager.closed === true) {
                return res.status(400).json({ wager: "Sorry, cannot delete a wager for a match that has begun." });
              } else {
                Wager.deleteOne({ _id: sub_wager }).then( wager => console.log(wager));
              }
            });
          });
        });
        UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
          var new_bankroll = user_league.user_bankroll + wager.amount;
          UserLeague.updateOne({ _id: user_league._id }, {
            user_bankroll: new_bankroll,
            bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100).toFixed(2)
          }, function(err, affected, res) {
                  console.log(res);
          });
        });

        Wager.deleteOne({ _id: id }).then( wager => console.log(wager));
        return res.status(200).json({ wager: "Wager successfully deleted" });

      } else if (wager.amount === 0) {
        return res.status(403).json({ wager: "Cannot delete sub-wager for parlay, must delete parent bet." });
      } else {
        Match.findOne({ _id: wager.match_id }).then( match => {
          if (match.match_date < Date.now() || wager.closed === true) {
            return res.status(400).json({ wager: "Sorry, cannot delete a wager for a match that has begun." });
          } else {
            UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
              var new_bankroll = user_league.user_bankroll + wager.amount;
              UserLeague.updateOne({ _id: user_league._id }, {
                user_bankroll: new_bankroll,
                bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100).toFixed(2)
              }, function(err, affected, res) {
                      console.log(res);
              });
            });
    
            Wager.deleteOne({ _id: id }).then( wager => console.log(wager));
            return res.status(200).json({ wager: "Wager successfully deleted" });
          }
        }); 
      }
    }
  });

});

async function updateSingleMatchGoldRollback(user_league, new_bankroll, wager) {
  await UserLeague.updateOne({ _id: user_league.id}, {
    user_bankroll: new_bankroll,
    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100).toFixed(2)
  }, function(err, affected, res) {
    console.log(res);
  }).then(() => {
    Wager.updateOne({ _id: wager._id }, {
      win: null,
      payout: null,
      closed: null
    }, function(err, affected, res) {
      console.log(res);
    });
  });
};

async function findSingleUserLeagueRollback(wager) {
  var user_league_temp;
  var new_bankroll;
  await UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
    new_bankroll = user_league.user_bankroll - wager.payout;
    user_league_temp = user_league  
  });
  await updateSingleMatchGoldRollback(user_league_temp, new_bankroll, wager);
};

async function processRollbackWagers(wagers) {
  for await (const wager of wagers) {
    if (wager.closed === false) {
      return;
    } else {
      if (wager.win === true) {
        await findSingleUserLeagueRollback(wager);          
      } else {
        Wager.updateOne({ _id: wager._id }, {
          win: null,
          payout: null,
          closed: null
        }, function(err, affected, res) {
          console.log(res);
        });
      }     
    }
  };
};

router.put("/:id/rollbackWagers", (req, res) => {

  var id = req.params.id;

  Match.findOne({ _id: id }).then( match => {
    if (!match) {
      return res.status(404).json({ match: "Sorry that match cannot be found, double check and try again" });
    } else if (match.winning_id === null ) {
      return res.status(400).json({ match: "Match has not been completed yet."})
    } else {
      Wager.find({ match_id: id }).then( wagers => {
        processRollbackWagers(wagers);
      });
    }
  });
});

async function updateSingleMatchGold(user_league, new_bankroll, wager, payout) {
  await UserLeague.updateOne({ _id: user_league.id}, {
    user_bankroll: new_bankroll,
    bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100).toFixed(2)
  }, function(err, affected, res) {
    console.log(res);
  }).then(() => {
    Wager.updateOne({ _id: wager._id }, {
      win: true,
      payout: payout,
      closed: true
    }, function(err, affected, res) {
      console.log(res);
    });
  });
};

async function findSingleUserLeague(wager, payout) {
  var new_bankroll;
  var user_league_temp;
  await UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
    new_bankroll = user_league.user_bankroll + payout;
    user_league_temp = user_league;
  });
  await updateSingleMatchGold(user_league_temp, new_bankroll, wager, payout);
};

async function processSingleMatchWagers(wagers, match) {
  for await (const wager of wagers) {
    if (wager.closed === true) {
      return;
    }
    if (wager.wager_type === "money_line") {
      if (wager.odds < 0) {
        //favorite logic
        if (wager.team_id === match.winning_id) {
          //win logic
          var payout = parseInt(((100/Math.abs(wager.odds))*wager.amount)+wager.amount);
          await findSingleUserLeague(wager, payout);     
        } else {
          //lose logic
          Wager.updateOne({ _id: wager._id }, {
            win: false,
            payout: 0,
            closed: true
          }, function(err, affected, res) {
            console.log(res);
          });
        }
      } else {
        //underdog logic
        if (wager.team_id === match.winning_id) {
          //win logic
          var payout = parseInt(((wager.odds/100)*wager.amount)+wager.amount);
          await findSingleUserLeague(wager, payout);  
        } else {
          //lose logic
          Wager.updateOne({ _id: wager._id }, {
            win: false,
            payout: 0,
            closed: true
          }, function(err, affected, res) {
            console.log(res);
          });
        }
      }
    } else if (wager.wager_type === "spread") {
      if (wager.odds < 0) {
        //favorite logic
        if (wager.team_id === match.winning_id && match.gold_difference > Math.abs(wager.odds)) {
          //win logic
          var payout = parseInt(wager.amount*2);
          await findSingleUserLeague(wager, payout); 
        } else {
          //lose logic
          Wager.updateOne({ _id: wager._id }, {
            win: false,
            payout: 0,
            closed: true
          }, function(err, affected, res) {
            console.log(res);
          });
        }
      } else {
        //underdog logic
        if (wager.team_id === match.winning_id) {
          //win logic
          var payout = parseInt(wager.amount*2);
          await findSingleUserLeague(wager, payout);
        } else if (wager.team_id === match.losing_id && match.gold_difference < Math.abs(wager.odds)) {
          //win logic
          var payout = parseInt(wager.amount*2);
          await findSingleUserLeague(wager, payout); 
        } else {
          //lose logic
          Wager.updateOne({ _id: wager._id }, {
            win: false,
            payout: 0,
            closed: true
          }, function(err, affected, res) {
            console.log(res);
          });
        }
      }
    } else {
      if ((wager.team_id === "over" && match.kills > match.over_under_odds) || (wager.team_id === "under" && match.kills < match.over_under_odds)) {
        var payout = parseInt(wager.amount*2);
        await findSingleUserLeague(wager, payout); 
      } else {
        //lose logic
        Wager.updateOne({ _id: wager._id }, {
          win: false,
          payout: 0,
          closed: true
        }, function(err, affected, res) {
          console.log(res);
        });
      }
    }
  };
};

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
        processSingleMatchWagers(wagers, match);
        return res.status(200).json({ wager: "Wagers successfully resolved" });
      });
    }
  });
});

// @route POST api/wagers/createParlay
// @desc Create New Parlay Wager with X number of bets
// @access Public
router.post("/createParlay", (req, res) => {

  var bet_list = [];
  var team_list = [];
  var items_processed = 0;

  if (req.body.parlay_user_league === "") {
    return res.status(400).json({ wager_league: "Please select a league to attribute this wager to."});
  } else if (req.body.wagers.isEmpty) {
    return res.status(400).json({ wager_info: "Please select team to wager on."});
  } else if (req.body.parlay_amount === "") {
    return res.status(400).json({ amount: "Please enter an amount for your wager." });
  } else if (req.body.parlay_amount <= 0) {
    return res.status(400).json({ amount: "Wager amount must be above 0." });
  }

  UserLeague.findOne({ _id: req.body.parlay_user_league }).then(user_league => {
    if (!user_league) {
      return res.status(404).json({ wager_league: "Submitted user is not part of that league, please double check and try again" });
    } else {
      if (req.body.parlay_amount > user_league.user_bankroll || req.body.parlay_amount <= 0) {
        return res.status(400).json({ amount: "Amount submitted is more that the user has available." });
      } else {
        req.body.wagers.forEach(wager => {
          Match.findOne({ _id: wager.wager_match }).then(match => {
            if (!match) {
              return res.status(404).json({ match: "Match not found, please double check and try again." });
            } else {
              if (new Date(match.match_date) < Date.now()) {
                return res.status(400).json({ match: "Cannot place wager on match that is already complete." });
              } else {
                const new_wager = new Wager({
                  user_league_id: req.body.parlay_user_league,
                  match_id: wager.wager_match,
                  match: match,
                  team_id: wager.wager_team,
                  amount: 0,
                  wager_type: wager.wager_type,
                  odds: wager.wager_odds,
                  win: null,
                  payout: null,
                  closed: null
                });
    
                new_wager.save().then(sub_wager => {
                  bet_list.push(sub_wager._id);
                  team_list.push(sub_wager.team_id);

                  items_processed++;
                  if(items_processed === req.body.wagers.length) {
                    const new_parlay = new Wager({
                      user_league_id: req.body.parlay_user_league,
                      match_id: "parlay",
                      match: match,
                      team_id: team_list.join(","),
                      amount: req.body.parlay_amount,
                      wager_type: "parlay",
                      odds: req.body.parlay_odds,
                      parlay_wagers: bet_list,
                      win: null,
                      payout: null,
                      closed: null
                    });

                    new_parlay.save().then(parlay => {
                      UserLeague.updateOne({_id: user_league._id}, {
                        user_bankroll: (user_league.user_bankroll - req.body.parlay_amount),
                        bankroll_percent_change: ((((user_league.user_bankroll - req.body.parlay_amount)/user_league.league.starting_cash)*100)-100).toFixed(2)
                      }, function(err, affected, res) {
                        console.log(res);
                      });
                      res.json(parlay);
                    }).catch(err => console.log(err));
                  }
                }).catch(err => console.log(err));
              }
            }
          });
        });
      }
    }
  }); 
});

async function updateBankroll(wager, win) {
  if (win === true) {
    let payout = (parseInt(wager.amount*wager.odds) + wager.amount);
    console.log(payout);
    await UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
      var new_bankroll = user_league.user_bankroll + payout;
      console.log(new_bankroll);

      UserLeague.updateOne({ _id: user_league.id}, {
        user_bankroll: new_bankroll,
        bankroll_percent_change: (((new_bankroll/user_league.league.starting_cash)*100)-100).toFixed(2)
      }, function(err, affected, res) {
        console.log(res);
      }).then(() => {
        Wager.updateOne({ _id: wager._id }, {
          win: true,
          payout: (parseInt(wager.amount*wager.odds) + wager.amount),
          closed: true
        }, function(err, affected, res) {
          console.log(res);
        });
      });    
    });
  };
}

async function processWagers(wagers) {
  var win = true;

  for await (const wager of wagers) {
    for await (const parlay_wager of wager.parlay_wagers) {
      console.log(parlay_wager);
      Wager.findOne({ _id: parlay_wager }).then(sub_wager => {
        if(sub_wager.win === null) {
          win = false;
          return;
        } else if (sub_wager.win === false) { 
          win = false;
          Wager.updateOne({ _id: wager._id }, {
            win: false,
            payout: 0,
            closed: true
          }, function(err, affected, res) {
            console.log(res);
          });
        } else {
          return;
        }
      });
    };
    console.log(win);
    await updateBankroll(wager, win)
  };
};

// @route PUT api/wagers/resolveParlays
// @desc resolve all open parlays
// @access public
router.put("/resolveParlays", (req, res) => {
  Wager.find({ match_id: "parlay", closed: null}).then(wagers => {
    console.log(wagers);
    processWagers(wagers);
    return res.status(200).json({ wager: "Parlays successfully resolved" });
  });
});

router.put("/rollbackParlays", (req, res) => {

  var id = req.params.id;

  Wager.find({ match_id: "parlay", closed: true }).then( wagers => {
    wagers.forEach( wager => {
      if (wager.win === true) {
        UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
          var new_bankroll = user_league.user_bankroll - wager.payout;
          
          UserLeague.updateOne({ _id: user_league.id}, {
            user_bankroll: new_bankroll,
            bankroll_percent_change: ((((new_bankroll)/user_league.league.starting_cash)*100)-100).toFixed(2)
          }, function(err, affected, res) {
            console.log(res);
          }).then(() => {
            Wager.updateOne({ _id: wager._id }, {
              win: null,
              payout: null,
              closed: null
            }, function(err, affected, res) {
              console.log(res);
            });
          });
        });           
      } else {
        Wager.updateOne({ _id: wager._id }, {
          win: null,
          payout: null,
          closed: null
        }, function(err, affected, res) {
          console.log(res);
        });
      }     
    });
    return res.status(200).json({ wager: "Parlays successfully reverted" });
  });
});

module.exports = router;
