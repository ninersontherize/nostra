import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek5 extends Component {
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
              With the first round robin complete, the season is officially past the halfway point. This week, 
              I am going to dole out some midseason awards in addition to the normal power rankings.
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
                  Week 5
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                  Previous Weeks: <Link to="/lcsPowerRankings/week0">0</Link> <Link to="/lcsPowerRankings/week1">1</Link> <Link to="/lcsPowerRankings/week2">2</Link> <Link to="/lcsPowerRankings/week3">3</Link> <Link to="/lcsPowerRankings/week4">4</Link>
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b> (10-0) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> CLG (W), Immortals (W)</p>
            <p className="flow-text rankings-section-text left-align">
              In a shocking turn of events, Cloud9 got aced for the first time all season by CLG, which, given that we 
              are 10 games into the season, is an amazing accomplishment. Even more astounding is that they have yet to lose 
              a single mid tower all split, even with Nisqy constantly roaming. Licorice had a bit of an off week but the rest of the team 
              is still looking very solid, and with the state of the rest of the league the 18-0 dream is looking very possible.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> FlyQuest (7-3), Dignitas (5-5)</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b> (7-3) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Golden Guardians (W), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              FlyQuest took care of business with a 2-0 week and have seperated themselves from the rest of the pack. 
              PowerOfEvil continues his phenomenal play this split, picking up Player of the Week honors, and in doing so became the first 
              non-Cloud9 player to win the award since Week 1. FlyQuest have a big matchup against Cloud9 to look forward to next week, 
              this could be the moment to end C9's long streak and prove that FLY has the chops to contend for the top spot come playoffs.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Cloud9 (10-0), Dignitas (5-5)</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b> (6-4) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> 100 Thieves (W), Evil Geniuses (W)</p>
            <p className="flow-text rankings-section-text left-align">
              TSM have only had 2-0 and 0-2 weeks so far this split, and this trend continued with their 2-0 Week 5 
              performance. Both of these games were expected wins, but its still a positive sign to see them execute 
              the matches cleanly. Bjergsen especially looked impressive this week on the Syndra, absolutely dumpstering Ryoma in 
              the 100 Theives game. Next week, they have an interesting matchup against a still struggling Team Liquid and a 
              rivalry game against CLG.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (3-5), Evil Geniuses (3-5)</p>
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b> (5-5) [+1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (W), Team Liquid (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Dignitas were able to have a strong performance against Immortals to match them in the standings, but 
              couldn't pull out the season sweep against Team Liquid. This team can be very inconsistent, but it was 
              encouraging to see Grig play his best game of the split against Xmithie and Immortals. Dig sits tied 
              for 4th with Immortals heading into the back half, but only sit one game ahead of 4 more teams, so 
              they will need to find strong form through the final weeks to separate themselves. They have an incredibly 
              tough week next week against the top 2 teams, and would do themselves some good to find a win in one of 
              those games.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> FlyQuest (7-3), Cloud9 (10-0)</p>
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b> (4-6) [+2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Evil Geniuses (L), Dignitas (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Fun fact: Team Liquid is 0-5 in their opening game of the week so far this season. They had a rough game 
              against Evil Geniuses, but were able to put together a dominating performance against Dignitas. Broxah has 
              only been here 9 days so far while the rest of the league has had their full team for the whole season now, 
              so they will still be improving and meshing as the season goes on, but it was very encouraging to see such 
              a dominating performance out of them. They will have a good test to start the week with a game against TSM.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (6-4), 100 Thieves (4-6)</p>
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b> (5-5) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), Cloud9 (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Immortals are now on a 3 game skid after storming out to a 5-2 start. Xmithie got absolutely bullied by Grig 
              and Blaber, and I'm not sure Immortals has an answer for when that happens right now. Immortals gameplay so far has 
              seemed to revolve around being the "smartest" team on rift rather than the most talented, relying on their macro/decision 
              making as opposed to individual skill, but it might be harder to find windows to get back in the game when they're behind 
              without strong lanes that can capitilize on the opportunities presented to them. We'll have to see how they can perform 
              in the back end of the split, but its good for their push for playoffs that they got the Cloud9 game out of the way.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Golden Guardians (4-6), CLG (1-9)</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b> (4-6) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (W), TSM (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Evil Geniuses were able to pick up a win over Team Liquid to start the week, which is a good sign for their 
              continued growth moving forward. Unfortunately, they couldn't get their first 2-0 by beating TSM - their 
              performance was good enough to put them in a 4-way tie for 6th place, right on the bubble of the playoff picture. Their 
              games this week against 100 Thieves and Golden Guardians will define how the rest of their season 
              will go in my opinion. In order to feel good about a playoff push, EG must go 2-0 this week to seperate themselves 
              from 2 of the other 4 win teams.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (4-6), Golden Guardians (4-6)</p>
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b> (4-6) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Unfortunately, Golden Guardians couldn't keep up their strong performances, ending the week 0-2 with losses to 
              FlyQuest and 100 Thieves. While Keith has shown flashes of being impressive on Thresh, this weekend he kind of 
              reverted to his old ways with a few isolated deaths and poor performances. I'm worried about the flexibility of 
              the team going forward, especially whether or not Keith can perform on different kinds of supports. Another 
              interesting wrinkle is that, as of now, midlaner Goldenglue no longer has "playing for gg" or a Golden Guardians banner 
              on his Twitter, so we'll have to follow that situation.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Immortals (5-5), Evil Geniuses (4-6)</p>
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_small.png"} /> <b>100 Thieves</b> (4-6) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (L), Golden Guardians (W)</p>
            <p className="flow-text rankings-section-text left-align">
              100 Thieves lost their 4th in a row before picking up a key win against Golden Guardians to put them in the 4-way 
              tie for 6th place. Ssumday hard carried the game for them with his Lucian into Gangplank counter-pick. I don't have 
              too much faith in this team being able to carry through any other lane right now, as neither Ryoma or CodySun have 
              looked particularly impressive this split. They play two other teams that are tied with them this week, so an 0-2 
              week would make a playoff run incredibly difficult for them.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Evil Geniuses (4-6), Team Liquid (4-6)</p>
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b> (1-9) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Cloud9 (L), FlyQuest (L)</p>
            <p className="flow-text rankings-section-text left-align">
              CLG made waves last week by grabbing Pobelter from Team Liquid and immediatly starting him in both games this week. 
              Although they lost both of their games this week, I thought he looked like a clear upgrade over Crown and really 
              like the move that they made. This move especially makes sense considering how little cohesion they appeared to have as a team, 
              with the language barrier potentially playing a part in that. I think playoffs may be out of the question for this team, 
              but I think they can turn things around a bit and finish strong down the stretch, but only time will tell.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (6-4), Immortals (5-5)</p>
          </div> 
          <div className="divider"></div>
          <div className="rankings-week-header-row">
            <div className="col s6 left-align">
              <span className="rankings-week-title center-align">
                Mid-Season Awards
              </span>
            </div>
          </div>
          <br />
          <div className="row">
            <h4 className="rankings-section-title left-align">
              <b>Coach of the Split</b>
            </h4> 
          </div>
          <p className="flow-text rankings-section-text left-align">1. Reapered (Cloud9)</p>
          <p className="flow-text rankings-section-text left-align">2. Curry (FlyQuest)</p>
          <p className="flow-text rankings-section-text left-align">3. Zaboutine (Immortals)</p>
          <div className="row">
            <h4 className="rankings-section-title left-align">
              <b>MVP</b>
            </h4> 
          </div>
          <p className="flow-text rankings-section-text left-align">1. Vulcan (Cloud9)</p>
          <p className="flow-text rankings-section-text left-align">2. Nisqy (Cloud9)</p>
          <p className="flow-text rankings-section-text left-align">3. Blaber (Cloud9)</p>     
          <div className="row">
            <h4 className="rankings-section-title left-align">
              <b>Rookie of the Split</b>
            </h4> 
          </div>
          <p className="flow-text rankings-section-text left-align">1. Johnsun (Dignitas)</p>  
          <div className="row">
            <h4 className="rankings-section-title left-align">
              <b>All-Pro First Team</b>
            </h4> 
          </div>
          <p className="flow-text rankings-section-text left-align">Top: Licorice (Cloud9)</p>
          <p className="flow-text rankings-section-text left-align">Jungle: Blaber (Cloud9)</p>
          <p className="flow-text rankings-section-text left-align">Mid: Nisqy (Cloud9)</p> 
          <p className="flow-text rankings-section-text left-align">Bot: Zven (Cloud9)</p>
          <p className="flow-text rankings-section-text left-align">Support: Vulcan (Cloud9)</p>    
          <div className="row">
            <h4 className="rankings-section-title left-align">
              <b>All-Pro Second Team</b>
            </h4> 
          </div>
          <p className="flow-text rankings-section-text left-align">Top: BrokenBlade (TSM)</p>
          <p className="flow-text rankings-section-text left-align">Jungle: Dardoch (TSM)</p>
          <p className="flow-text rankings-section-text left-align">Mid: PowerOfEvil (FlyQuest)</p> 
          <p className="flow-text rankings-section-text left-align">Bot: Altec (Immortals)</p>
          <p className="flow-text rankings-section-text left-align">Support: Ignar (FlyQuest)</p>   
          <div className="row">
            <h4 className="rankings-section-title left-align">
              <b>All-Pro Third Team</b>
            </h4> 
          </div>
          <p className="flow-text rankings-section-text left-align">Top: Ssumday (100T)</p>
          <p className="flow-text rankings-section-text left-align">Jungle: Closer (GG)</p>
          <p className="flow-text rankings-section-text left-align">Mid: Bjergsen (TSM)</p> 
          <p className="flow-text rankings-section-text left-align">Bot: Kobbe (TSM)</p>
          <p className="flow-text rankings-section-text left-align">Support: Biofrost (TSM)</p> 
        </div>  
      </div>
    );
  }
}

export default LcsPowerRankingsWeek5;