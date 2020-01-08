import React, { Component } from "react";
import { Link } from "react-router-dom";

class OddsInfo extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row"> 
          <div className="row info-title-row">
            <h3 className="info-header">
              Odds Help
            </h3>
            <p className="flow-text grey-text text-darken-1 info-sub-header">
              On this page we explain Moneyline and Spread wagers 
              <br></ br>
              to help you make smart, informed decisions.
            </p>
          </div>
          <div className="divider" />
          <div className="row">
            <h4 className="info-section-title left-align">
              Moneyline Wagers
            </h4>
            <div className="row">
              <p className="flow-text info-section-text left-align">
                A moneyline wager is one of the easiest kinds of wagers you can make. 
                Simply put, it means betting on a specific team to win a game. 
                While betting on the gold spread is about who wins and by how much, a moneyline bet is solely about who wins.
                Moneyline bets might seem confusing until you understand the essentials. Let’s take a look at an example to illustrate how they work.
              </p>
            </div>
          </div>  
          <div className="row">
            <h4 className="info-section-title left-align">
              Moneyline Example
            </h4>
            <div className="row">
              <img className="info-example-img" src={process.env.PUBLIC_URL + "/info_screenshots/moneyline_example.png"} />
            </div>
            <div className="row">
              <p className="flow-text info-section-text left-align">
                Here we have a matchup between Cloud9 and Team Liquid - it should be a close match, and the odds reflect that.
                In the first row you can see the moneyline odds represented for each team:
              </p>
              <img className="info-example-img" src={process.env.PUBLIC_URL + "/info_screenshots/moneyline_zoom.png"} />
              <p className="flow-text info-section-text left-align">
                In this example, Team Liquid are favored to win, as shown by the minus sign written in front of the 140, and Cloud9 are the underdogs, as shown by the plus sign in front of the 130.
                <br />
                <br />
                What these numbers mean is that if you bet on the favorite, Team Liquid, your payout will be less than the amount you bet, specifically you will have to bet 140g to win 100g.
                On the other hand, if you put your money on the underdogs, Cloud9, your payout will be higher than the amount you bet, in this case you can bet 100g to win 130g.
              </p>
            </div>
          </div>   
          <div className="divider" />
          <div className="row">
            <h4 className="info-section-title left-align">
              Gold Spread Wagers
            </h4>
            <div className="row">
              <p className="flow-text info-section-text left-align"> 
                The gold spread, which is sometimes referred to as the “handicap”,
                 is the amount of gold taken from the favorite, or given to the underdog, 
                 in order to open up the chances of either team winning the wager evenly.
                 In traditional sports this is usually represented by points, but in League of Legends we 
                 use gold difference to represent how dominant a team was in victory.
                 <br />
                 <br />
                 In most games, there’s usually a team that is more likely to win, based on a number of statistical factors. 
                 If the only kind of wager available was on who would win between a very strong team and a poor team, it wouldn’t be all that exciting. 
                 The gold spread was designed to make wagers much more interesting, since it allows a wager on the losing team to win you gold. How? Let’s break down an example:
              </p>
            </div>
          </div> 
          <div className="row">
            <h4 className="info-section-title left-align">
              Gold Spread Example
            </h4>
            <div className="row">
              <img className="info-example-img" src={process.env.PUBLIC_URL + "/info_screenshots/spread_example.png"} />
            </div>
            <div className="row">
              <p className="flow-text info-section-text left-align">
                Here we have a matchup between 100Thieves and the Golden Guardians - if we were to wager on this match straight up, 100Thieves would be the obvious choice.
                However, the gold spread gives us more options and makes the decision process more interesting. In the second row you can see the gold spread odds represented for each team:
              </p>
              <img className="info-example-img" src={process.env.PUBLIC_URL + "/info_screenshots/spread_zoom.png"} />
              <p className="flow-text info-section-text left-align">
                In this example, we have a favorite to win, and an underdog. 100Thieves are the favorites, and that is shown by the (–) value in front of the 8.5K. 
                Underdogs are represented by the (+) value.  The 8.5K gold value is the gold difference either team could win or lose by. 
                If you think 100Thieves will win by MORE than 8.5K gold, then you’d bet on the favorite in this case, meaning that 100Thieves have to win by 8501 or more gold in order for you to win your bet.
                <br />
                <br />
                Perhaps you’re more confident that the Golden Guardians can either win the game or lose by less than 8.5K gold.
                In that case you’ll want to place your bet on the underdog. 
                If 100Thieves wins with a gold difference of less that 8.5K gold – the bet on the +8.5K gold spread is a winning bet if you bet on the Golden Guardians.
                If the Golden Guardians win outright, than the GGS bet wins regardless of gold difference.
              </p>
            </div>
          </div>      
               
        
        </div>
      </div>
    );
  }
}

export default OddsInfo;