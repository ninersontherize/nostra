//process Parlays
async function updateBankroll(wager, win) {
  var new_bankroll;
  var user_league_temp;
  if (win === true) {
    let payout = parseInt(wager.amount*wager.odds);
    await UserLeague.findOne({ _id: wager.user_league_id }).then(user_league => {
      new_bankroll = user_league.user_bankroll + payout;
      user_league_temp = user_league;  
    });
    await updateSingleMatchGold(user_league_temp, new_bankroll, wager, payout);
  };
}

async function processWagers(wagers) {
  var win = true;

  for await (const wager of wagers) {
    for await (const parlay_wager of wager.parlay_wagers) {
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

//rollback Parlays and regular wagers
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

//process standard wagers
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

exports.processRollbackWagers = processRollbackWagers;
exports.processWagers = processWagers;
exports.processSingleMatchWagers = processSingleMatchWagers;