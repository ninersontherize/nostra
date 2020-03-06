import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek6 extends Component {
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
              With 6 games left in the season, things are heating up. Cloud9 look like they are going 
              to breeze to a 1st seed, but there's chaos within the rest of the league. How does the 
              league shape up as they make this final push to playoffs.
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
                  Week 6
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                  Previous Weeks: <Link to="/lcsPowerRankings/week0">0</Link> <Link to="/lcsPowerRankings/week1">1</Link> <Link to="/lcsPowerRankings/week2">2</Link> <Link to="/lcsPowerRankings/week3">3</Link> <Link to="/lcsPowerRankings/week4">4</Link> <Link to="/lcsPowerRankings/week5">5</Link>
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b> (12-0) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> FlyQuest (W), Dignitas (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Cloud9 finally lost their first mid tier 1 turret last week against Dignitas, which is a crazy thing to say in the 12th game 
              of the split. They also picked up a solid win against FlyQuest, who seemed to be their biggest test for the rest of the season. 
              It seems like the 18-0 season can definitely happen, and I'm looking forward to a key matchup next week against TSM, and a 
              match against a surging Team Liquid for their final game. Another 2-0 week for Cloud9 will lock up the 1st seed for playoffs 
              (as will 1 win and 1 FlyQuest loss).
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (6-6), Golden Guardians (5-7)</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b> (8-4) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Cloud9 (L), Dignitas (W)</p>
            <p className="flow-text rankings-section-text left-align">
              FlyQuest couldn't get the job done against Cloud9, but they did close strong against Dignitas to end the week 1-1. The more the season 
              goes by, the less this team seems like a fluke and more like a legitimate contender. They are 2 games ahead of Team Liquid, TSM, and 
              Immortals for 2nd place, and have the opportunity to pick up a huge win this week over TSM. PowerOfEvil and crew will be looking for 
              a clean 2-0 this week to continue their strong form and hope to lock in the 2nd seed to avoid Cloud9 in the first round.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Evil Geniuses (5-7), TSM (6-6)</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b> (6-6) [+2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (W), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Team Liquid is back.(?) Maybe not all the way yet, but they were able to put together a strong showing last week wiht convincing wins over both TSM 
              and 100 Thieves, Broxah also managing to pick up Player of the Week hours. The biggest surprise this week was Tactical, who subbed in for a sick Doublelift 
              and put on incredible performance that immediately put him in the conversation for that same Player of the Week title that Broxah was able to grab. 
              Interestingly enough, TL brought on Rikara for Academy so that Tactical could focus on LCS along with Doublelift, who is now feeling better 
              but was benched due to a lack of motivation. This could be the spark that lights a fire under his ass and brings us back to the Team Liquid of old. 
              Looking ahead to this weekend, they should be able to pick up an easy 2-0 over CLG and Immortals, but I'd watch out for that CLG game.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> CLG (2-10), Immortals (6-6)</p>
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b> (6-6) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (L), CLG (L)</p>
            <p className="flow-text rankings-section-text left-align">
              TSM find themselves in a very precarious position right now. After an 0-2 last week losing to Team Liquid and last place CLG, they 
              are in a 3-way tie for third, one game ahead of a 4-way tie for 6th, and playing the two strongest teams in the league this week. 
              It's a very real possibility that they could go 0-2 this week and find themselves just at the edge, or out, of playoffs with two weeks 
              remaining - which is far below anybody expected this team to be at this point. I won't call the game against FlyQuest a must win, 
              but it would be a very important win for them given how strong Cloud9 is right now, but anything could happen and they might be the first team to 
              hand Cloud9 a loss as well.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Cloud9 (12-0), FlyQuest (8-4)</p>
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b> (5-7) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> FlyQuest (L), Cloud9 (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Dignitas started the season strong at 3-0, but have put up a dismal 2-9 record in their last 11 games. Granted, 4 of those games are against 
              Cloud9 and FlyQuest, and they won't have to play either of those teams or Team Liquid again in the back-half of the split, but they are going 
              to need to turn it around soon if they are going to make a push for playoffs. Hopefully Froggen can return to his Week 1 form to bring them 
              back into the playoff picture, and Johnson can have some of his early season performances again as well. An 0-2 this week would all 
              but doom them for playoffs barring a major collapse by another squad.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (5-7), Golden Guardians (5-7)</p>
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b> (5-7) [+2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (W), Evil Geniuses (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Golden Guardians picked up a huge win to start the week, absolutely stomping Immortals while going deathless in the process. They followed that
              dominance by losing in what was admittedly a bit of a fiesta against Evil Geniuses, which is unfortunate because a win would have put them in a 
              great position in the standings. Now, they are in a 4-way tie for the final playoff spot, with a game against Cloud9 looming on Monday. Therefore, 
              the Sunday game against Dignitas is incredibly important if Golden Guardians wants to make a push towards playoffs, because I don't see them putting 
              up much of a fight against Cloud9.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Dignitas (5-7), Cloud9 (12-0)</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_small.png"} /> <b>100 Thieves</b> (5-7) [+2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Evil Geniuses (W), Team Liquid (L)</p>
            <p className="flow-text rankings-section-text left-align">
              100 Thieves ended this week 1-1 to remain tied for 6th with a win against Evil Geniuses and a loss against Team Liquid. Meteos and Ryoma 
              had a great game against Evil Geniuses, which is an encouraging sign from a team that has been more focused on development and "the process" by 
              PapaSmithy's admission. Now they will face Dignitas and Immortals, two teams who will be competing for this 6th playoff spot down the stretch, 
              and really would like to pick up at least one win this week.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Dignitas (5-7), Immortals (6-6)</p>
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b> (5-7) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Evil Geniuses lost pretty handily to 100 Thieves last week, but was able to pick up a win over Golden Guardians. While not the cleanest win, 
              it was good for them to pick up a win to keep them tied for 6th. Next week, they will need to avenge their loss against CLG from earlier 
              in the season, which may be more difficult said than done given their new improved form. I think a loss there would surely destroy their 
              playoff chances as they still have to play Cloud9, FlyQuest, and Team Liquid in their final 3 weeks.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> FlyQuest (8-4), CLG (2-10)</p>
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b> (6-6) [-3]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Golden Guardians (L), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Immortals were one loss against CLG away from moving down into the 10th spot in these power rankings. They were able to close that mess 
              of a game out though, and currently find themselves at 6-6 tied for 3rd. I really don't understand what's going on over there at the moment. 
              Altec was one of their best performing members in the first half, and they subbed him out for Apollo and then proceeded to not pick up a single kill 
              in their game against Golden Guardians. They have a chance to prove me wrong this week with manageable games against 100 Thieves and Team Liquid, 
              but given TL's form now the later may prove to be more difficult.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (5-7), Team Liquid (6-6)</p>
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b> (2-10) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (W), Immortals (L)</p>
            <p className="flow-text rankings-section-text left-align">
              It feels bad keeping CLG here because I really like the move they made picking up Pobelter, and I think they are a much better team for it. 
              We saw the dividends on display Sunday, with Pob decimating TSM on his Viktor pick. However, the CLG of old reared its ugly head the next day, 
              with their game against Immortals filled with people getting caught, bad fights, and huge indecision which eventually led to them slowly bleeding 
              their early advantage away in what had to be a disappointing loss. While not mathematically eliminated yet, its hard to imagine a world where 
              they make a run for playoffs in Spring. If they can close the split strong, they can hold their heads up high as they look towards Summer.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Team Liquid (6-6), Evil Geniuses (5-7)</p>
          </div> 
        </div>
      </div>
    );
  }
}

export default LcsPowerRankingsWeek6;