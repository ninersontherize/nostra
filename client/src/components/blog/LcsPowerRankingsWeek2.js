import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek2 extends Component {
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
              Let's take a look at where the teams stand at this point in the season. 
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
                  Week 2
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                  Previous Weeks: <Link to="/lcsPowerRankings/week0">0</Link> <Link to="/lcsPowerRankings/week1">1</Link>
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b> (4-0) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (W), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Cloud9 continue to look head and shoulders above the rest of the LCS right now after dismantling Immortals and 100 Thieves. 
              Zven is an insane 18-0-33 so far this season (the only deathless player left in the LCS) and earned himself Player of the 
              Week honors. Its also very encouraging how well he performed on Senna given some other ADCs in the LCS have been struggling 
              on the pick (notably Doublelift). Other than Team Liquid though, Cloud9 has had a relatively easy schedule so far, and next 
              week's games against Dignitas and FlyQuest will serve as a good heat check. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> FlyQuest (3-1), Dignitas (3-1)</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b> (3-1) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (W), FlyQuest (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Many people were very impressed with Dig's week 1, but we weren't sure if this performance was a fluke or if they would be able 
              to sustain it for the future. Dignitas qualmed many peoples' fears by beating Team Liquid in what was the most exciting game of 
              the split so far, with rookie ADC JohnSun popping off on Aphelios. However, they were dismantled by FlyQuest in their first showing 
              on Monday Night League, showing that they may be closer to the rest of the pack than they are to Cloud9. Still, getting out of a week 
              with two of the best looking teams in the league so far is a great sign of things to come. They will have their biggest test of the split 
              so far next week when they take on undefeated Cloud9. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (2-2), Cloud9 (4-0)</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b> (2-2) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), FlyQuest (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Team Liquid made it through anothher 1-1 week this time taking a win against FlyQuest and a loss against Dignitas. It seems Team Liquid 
              still has some issues to work through but this week was much more encouraging, as the win over FlyQuest was a blowout, and the loss to 
              Dignitas was farly close. It seems so far that Doublelift isn't comfortable on the Senna pick, so we'll see if they continue to try to 
              figure out how to play that or if they stick to some of the more traditional hypercarry champions like Xayah. This week is a big week 
              for Team Liquid, as according to Steve we should hear on Thursday whether Broxah's visa gets accepted or denied, so hopefully they can 
              get their full starting roster together soon. In the mean time though, they have already played Cloud9, Dignitas, and FlyQuest, so they 
              should be able to secure a 2-0 next week. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (2-2), Golden Guardians (1-3)</p>
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b> (3-1) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (L), Dignitas (W)</p>
            <p className="flow-text rankings-section-text left-align">
              FlyQuest is another team that came into this week 2-0, but people what sure what to think as those two wins came against two of the weakest 
              teams in the league. They were dismantled by Team Liquid, only to later return the favor to Dignitas and end a difficult week 1-1. PowerOfEvil 
              in particular looked great on the Rumble pick, and the synergy between him and Santorin's Jarvan looked great. FlyQuest will have to try to 
              maintain this level of play next week with a difficult game against Cloud9, but should be able to pick up a win over Evil Geniuses with their 
              poor form right now. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Cloud9 (4-0), Evil Geniuses (1-3)</p>
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b> (2-2) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Evil Geniuses (W), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              <b>Good news:</b> TSM finally was able to get some wins on the board and even secured themselves a 2-0 week, so a great rebound by them. Their performance 
              against CLG in particular was very impressive (albeit it appears CLG is in a very rough spot right now)
              <br />           
              <b>Bad news:</b> They still did not look very convincing in their win over a heavily struggling Evil Geniuses team, and I'd even say that Evil Geniuses 
              threw that game away. 
              <br />
              <b>Worse News:</b> 3 out of 4 of the teams they have played are some of the weakest in the league, and TSM probably should be a very comfortable 3-1 
              right now. They still have to play Cloud9, Dignitas, and FlyQuest
              <br />
              A big test for TSM will be how well they perform in their first game of the week against Dignitas. Hopefully Bjergsen is no longer sick and can 
              start returning to form as well. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Dignitas (3-1). Golden Guardians (1-3)</p>
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_small.png"} /> <b>100 Thieves</b> (2-2) [+1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> CLG (W), Cloud9 (L)</p>
            <p className="flow-text rankings-section-text left-align">
              100 Thieves ended with another 1-1 week, and find themselves in the final playoff spot in this power ranking, but mostly on account of the teams 
              below them looking so poor. If you had to ask me right now, I'd say teams 1-5 in this list are ones that can possibly compete for a title, and 
              100 Thieves and the teams below are nust trying too make playoffs. I am not feeling too good about how Ryoma is looking so far, and I think CodySun 
              and Ssumday have room to improve as well. We'll see how this team continue to progress throughout the season. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Team Liquid (2-2), Immortals (2-2)</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b> (1-3) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Evil Geniuses have been my biggest disappointment of the season so far. Svenskeren in particular looked really rough in Evil Geniuses 0-2 week 
              last week, and Bang especially looked visibly frustrated after the TSM loss. Kumo looked much better though after looking non-existant in Week 1, 
              so here's to hoping that these pieces can eventually synergize and develop into a strong team. For now though, they're not looking too hot. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Golden Guardians (1-3), TSM (2-2)</p>
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b> (2-2) [+1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Cloud9 (L), Golden Guardians (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Immortals walked away with another 1-1 week, but this week it was mostly because they got to play Golden Guardians. Lots of people were questioning 
              the decision to pick up Eika instead of using somebody established like Pobelter or Damonte, and based on the first couple of weeks of play I'd say 
              they are right to challenge that. Immortals do have a chance to go 1-1 at least again next week, with games against 100 Thieves and CLG. I think they'll 
              need a 2-0 week if they want to maybe prove any of the haters wrong. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (2-2), CLG (0-4)</p>
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b> (1-3) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Evil Geniuses (W), Immortals (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Please get me off Mr. Keith's Wild Ride. I'm exaggerating, but the Keith experiment is looking very rough as of now. He gets caught out in the middle 
              of nowhere a lot has a few isolated deaths. Nonetheless, there is still time for the team to develop, and there were some bright spots last week, such 
              as Hauntzer's dominant split-pushing performance on Fiora last week in what was an incredibly exciting win over Evil Geniuses. Golden Guardians have a 
              tough week ahead though playing a TSM team that may be finding its form, and Team Liquid. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (2-2), Team Liquid (2-2)</p>
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b> (0-4) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> 100 Thieves (L), TSM (L)</p>
            <p className="flow-text rankings-section-text left-align">
              There's not much nice I can say about CLG right now except that they have a fairly easy week this week, so they can hopefully pick up their first win. 
              So far this split though CLG has just looked awful. Nobody is on the same page about things it seems, which was most apparent when Smoothie died on a 
              giant flank alone with his team turtling in base. I had high expectations for this team, as I thought Crown over PowerOfEvil and Smoothie over Biofrost 
              were both either sidegrades or upgrades (you could argue Bio > Smoothie perhaps), but as it stands there is no way this team makes playoffs unless they 
              fix things in a big way. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Evil Geniuses (1-3), Immortals (2-2)</p> 
          </div>  
        </div>
      </div>
    );
  }
}

export default LcsPowerRankingsWeek2;