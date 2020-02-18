import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek4 extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row"> 
          <div className="row rankings-title-row-2">
            <h3 className="rankings-header">
              LCS Power Rankings
            </h3>
            <p className="flow-text grey-text text-darken-1 rankings-sub-header-1">
              <br />
              We’ve almost reached the the halfway point for Spring Split. Cloud9 and CLG 
              are separating themselves from the pack, while the clump between them remained 
              just as clumpy. Here’s how the teams look after Week 4.
              <br></ br>
              <br />
              by Connor Jennison
            </p>
          </div>
          <div className="divider" />
          <div className="row">
            <div className="rankings-week-header-row">
              <div className="col s6 left-align">
                <span className="rankings-week-title left-align">
                  Week 4
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                  Previous Weeks: <Link to="/lcsPowerRankings/week0">0</Link> <Link to="/lcsPowerRankings/week1">1</Link> <Link to="/lcsPowerRankings/week2">2</Link> <Link to="/lcsPowerRankings/week3">3</Link>
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b> (8-0) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (W), Evil Geniuses (W)</p>
            <p className="flow-text rankings-section-text left-align">
              It's clear Cloud9 are in a league of their own. TSM got over 1,000 gold lead very early on but it didn't matter as Cloud9 
              immediately took it back and ran away with it. With Nisqy taking home Player of the Week honors, 3 out of 5 players on 
              the team have won the award now. With a victory over CLG on Saturday, which seems almost inevitable, Cloud9 will move 
              to Cloud9-0 and complete the perfect first round robin. I'm sure they'll drop a game to someone in the 2nd half, but 
              the question on everyone's mind right now is who will be the first to finally topple them.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> CLG (1-7), Immortals (5-3)</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b> (5-3) [+2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (W), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              FlyQuest bounced back in a big way with a 2-0 week. Although they got behind on TSM early, they did a great job of 
              holding strong and fighting smart fights, preventing TSM from snowballing the game and allowing their scaling comp 
              to scale to Mountain Soul and victory. They then came back on Monday and destroyed 100 Thieves in every facet of 
              the game. With games next week against Golden Guardians and CLG to open up the back half of the season, they 
              have a real chance to move to 7-3 and be in a great spot for playoffs.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Golden Guardians (4-4), CLG (1-7)</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b> (4-4) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Cloud9 (L), FlyQuest (L)</p>
            <p className="flow-text rankings-section-text left-align">
              TSM took a bit of a stumble this week after winning 4 games in a row. The Cloud9 loss you could say was expected, 
              as Cloud9 just appear to be way better than everyone else right now. The FlyQuest loss though was a game they 
              probably should have one. I liked their Pantheon/Taliyah draft, and they used the global pressure effectively 
              to get over a 5000 gold lead. But again, the TSM mid game problems arose and they were unable to snowball. 
              Dardoch especially looked great on the Pantheon jungle in the early game, but kinda fell apart later on. 
              With how skilled these individual players are, you have to wonder if TSM will start trying to draft scaling 
              to give themselves more of a late game insurance policy.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (3-5), Evil Geniuses (3-5)</p>   
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b> (5-3) [+1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (W), Evil Geniuses (L)</p>
            <p className="flow-text rankings-section-text left-align">
              I was so ready to buy in on Immortals, but then they had to go and lose to Evil Geniuses on Sunday. Their 
              game against Team Liquid was probably one of the most dominant games all split though. They placed a smart 
              defensive ward to first blood Broxah on an invade, then continued to track him and got so far ahead they 
              could just keep them out of their own jungle. Granted, Broxah played one day of scrims as was jet-lagged 
              on 5 hours of sleep, but its at least an encouraging sign that Immortals can maybe contend for 2nd.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Dignitas (4-4), Cloud9 (8-0)</p>                
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b> (4-4) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> 100 Thieves (W), Golden Guardians (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Dignitas really would have like to beat Golden Guardians to move to 5-3, but as it stands are 4-4 moving 
              into Week 5. While I wasn't so thrilled to see the revival of the Dignitas Baron™, I think its a good 
              sign that Froggen, the quitessential control mage player, picked up the Ornn in their game against 
              100 Thieves. They also are in a very fortunate position playing Team Liquid in the first game of 
              the second round robin when they will only have 1 week of scrims with their new jungler.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Immortals (5-3), Team Liquid (3-5)</p>              
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b> (4-4) [+3]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> CLG (W), Dignitas (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Golden Guardians surged this week, picking up their first 2-0 of the split. It's starting to become 
              clear that Keith can do very well on playmaking supports, as his Thresh gameplay this week continued 
              to shine. The Dignitas win in particular is a very good sign that this team is developing well and 
              can potentially compete for a playoff spot if they keep up their play through the back-half, and 
              next week's tests of 100 Thieves and FlyQuest will be a good indication of what's to come.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> FlyQuest (5-3), 100 Thieves (3-5)</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b> (3-5) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (L), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              It's clear Liquid are going to need some time. Broxah had just landed and immediately scrimmed 
              and then the next day was playing in LCS, so I'll give him the benefit of the doubt and give 
              him some time to get rested and adjusted. Doublelift looked like the Doublelift of old in 
              their dominating win against CLG, but to be fair that was against CLG. I think Team Liquid 
              will figure things out, but right now Team Liquid is sitting at 3-5 in the first half of 
              the season which is out of playoffs, so hopefully they start to improve sooner rather 
              than later.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Evil Geniuses (3-5), Dignitas (4-4)</p>               
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b> (3-5) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (W), Cloud9 (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Evil Geniuses got a big win over Immortals to start the week. Granted the 2 kills that 
              were gifted to Jizuke level 1 might have helped a lot, but its an encouraging sign that 
              the team is starting to figure things out a bit. They did get decimated by Cloud9, but 
              then again who hasn't gotten decimated by Cloud9 so far this split. They will have a 
              tough week next week though against a more well-rested and practiced Team Liquid, and 
              a TSM team that still looks to be towards the top. A 1-1 week would put them in a good 
              position to make a push down the stretch.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Team Liquid (3-5), TSM (4-4)</p>               
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_small.png"} /> <b>100 Thieves</b> (3-5) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), FlyQuest (L)</p>
            <p className="flow-text rankings-section-text left-align">
              100 Thieves are now on a 3 game skid, and things are looking dire for papa and the gang. 
              They looked in especially poor form against FlyQuest, specifically one of their veteran players 
              in Meteos looked disappointing. CodySun also hasn't really stood out that much this split, 
              but then again he is known as a late game monster, and this team hardly gets to late game 
              in a favorable position. They will need to turn around in a big way this weekend if they 
              want to keep their playoff hopes alive.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (4-4), Golden Guardians (4-4)</p>               
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b> (1-7) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Golden Guardians (L), Team Liquid (L)</p>
            <p className="flow-text rankings-section-text left-align">
              It's getting to the point with CLG where I think they're going to need to make some organizational 
              changes soon. I wasn't sure why they got rid of Irean after they showed so much improvement over 
              the course of last year, but clearly SSong is not working out so far. I'm interested to see if this 
              team tries to make any changes to shake things up, but with games against Cloud9 and FlyQuest next week, 
              they will have to truly counter logic to avoid being 1-9.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Cloud9 (8-0), FlyQuest (5-3)</p>
          </div>  
        </div>
      </div>
    );
  }
}

export default LcsPowerRankingsWeek4;