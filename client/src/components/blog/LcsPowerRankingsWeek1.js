import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek1 extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row"> 
          <div className="row rankings-title-row">
            <h3 className="rankings-header">
              LCS Power Rankings
            </h3>
            <p className="flow-text grey-text text-darken-1 rankings-sub-header-1">
              <br/>
              Now that LCS has officially kicked off, we can finally make giant overreactions 
              on teams with a tiny sample size of games. We saw stomps, snoozefests, and one 
              game that went on so long that both teams should have been disqualified. With all that said, 
              here are my post-week 1 power rankings for LCS.
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
                  Week 1
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                  Previous Weeks: <Link to="/lcsPowerRankings/week0">0</Link>
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b> (2-0) [+1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (W), Golden Guardians (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Cloud9 lost the offseason again it seems. A lot of people were skeptical of them picking up Zven after his latest form on TSM and spending 1.5m on 
              Vulcan, but so far it is looking to pay dividends. The new C9 botlane handily won lane vs TL's Doublelift and CoreJJ, which is something this team 
              hasn't seen consistently in quite some time,with Sneaky and Zeyzal both being weaker laners. Some fans were also concerned about Nisqy's performance 
              without Svensekren, but he is looking to be one of the best mids in the LCS again this year, and Blaber is reminding us why he has the highest winrate 
              in LCS histroy. Licorice just does Licorice things as well, still establishing himself as the best top in LCS. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Immortals (1-1), 100 Thieves (1-1)</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b> (2-0) [+5]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Evil Geniuses (W), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Here might be the biggest overreaction so far, but Dignitas looked incredibly solid in the first two games. They dismantled both Evil Geniuses 
              and CLG, both pre-season favorites to dethrone TL, and Froggen looked incredible picking up Player of the Week honors. Rookie Johnsun looked 
              very solid in his first couple of games in the LCS, which was a big question mark for this team. If Huni and the boys can keep this level of 
              play up, they should be able to holoholohold onto their playoff position for the whole season. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Team Liquid (1-1), FlyQuest (2-0)</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b> (1-1) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Cloud9 (L), TSM (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Look, its tough for TL. They don't have their starting jungle, as Broxah is still in Europe with Visa issues. And although 
              Shernfire could definitely have been less afraid to engage at times, their problems in Week 1 looked deeper. Doublelift had 
              little to no impact in the C9 game, and got dumpstered early vs TSM (although somehow ended the game way ahead of Kobbe). 
              Jensen was outclassed by Nisqy's Veigar, but was able to carry TL over the finish against TSM. Impact got solo killed by 
              Licorice in the game against C9. Team Liquid is still Team Liquid though and shouldn't be concerned, especially with Spring 
              Split only mattering for MSI and Rift Rivals now. Hopefully they can get Broxah in soon, and begin developing synergy there to 
              ramp up for the future. For now though, I have them potentially on upset alert for both of their games next week. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Dignitas (2-0), FlyQuest (2-0)</p>
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b> (2-0) [+4]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (W), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Most people wrote FlyQuest off for Spring Split, but they have come out of the gate swinging hard. I feel like we've been here before 
              no? When comparing this roster to the Spring 2019 roster that ended the regular season in 4th and made semifinals before being bested 
              by Team Liquid, you could argue that both PowerOfEvil over Pobelter and Ignar over JayJ are straight upgrades. V1per again reminded 
              people who might have forgotten after the long offseason why you need to ban his Riven, putting in the most 1v9 perfomance so far 
              against CLG. With FlyQuest's new TreeQuest initiative as well, I hope they can sustain this level for the weeks to come.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Team Liquid (1-1), Dignitas (2-0)</p>
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b> (0-2) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Immortals (L), Team Liquid (L)</p>
            <p className="flow-text rankings-section-text left-align">
              So one might think that TSM should be lower on this list given their performance this week, but there were some positives to take away. 
              They had the hightest Gold Difference at 15 minutes in the league, looked very in control in the early game against Team Liquid, and Bjergsen 
              was apparently sick this week and will hopefully be better next week. That being said, their inability to snowball the leads they've gotten 
              is very concerning for the future, especially considering they have bootcamped as a team longer than any other team in the league I believe. 
              That being said, I do think TSM will bounce back and 2-0 next week, but we will need to keep a close eye on them.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Evil Geniuses (1-1), CLG (0-2)</p>
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b> (1-1) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), 100 Thieves (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Evil Geniuses, along with the next team on this least, are one of the highest variance teams in terms of people's perception of them. 
              I've seen people put them as high as 2nd and as low as 8th, and this kind of variance also showed up in week 1. In their first game 
              they were completely outclassed by Dignitas, but then in their second game they stayed close to 100 Thieves for the beginning part 
              of the game until Jizuke's LeBlanc completely took over. I thought going into this season that their best path to a successful season 
              would be Svenskeren unlocking Jizuke to be the Italian Stallion of old once again, and we see now that it can pay dividends. I think 
              though Kumo is going to need to step up big time after a pretty underwhelming week if this team is going to have sustained sucess.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Golden Guardians (0-2), TSM (0-2)</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_large.png"} /> <b>100 Thieves</b> (1-1) [-2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Golden Guardians (W), Evil Geniuses (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Another team with a high variance in percieved skill is 100 Thieves. On the one hand they have a solid core in Meteos, Ssumday, and CodySun, 
              but they also have somewhat unknown quantities in Stunt and Ryoma. That being said I was overall disappointed with their first week of play. 
              Closer did an incredible job choking Meteos out of the game for a long time when 100 Thieves played Golden Guardians and Ryoma ended that 
              game with just over 5 cs/min. Ultimately 100 Thieves showed strong resilience to come back and win. However, considering that the general 
              public percieved Golden Guardians as a 10th place team, the Thieves are going to have to do better than that if they want to secure a 
              playoff spot. I'm going to be looking to the CLG game as a good lithmus for how this roster will perform going forward. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> CLG (0-2), Cloud9 (2-0)</p>
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b> (0-2) [+2]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> 100 Thieves (L), Cloud9 (L)</p>
            <p className="flow-text rankings-section-text left-align">
              At first I had Golden Guardians swapped with Immortals in this list, but looking back on it I was very impressed with how the team 
              played considering their expectations for the season. They looked in command early on against 100 Thieves, a playoff team in a lot 
              of people's minds. Against Cloud9, they made a good double teleport and went 1-for-1, neutralising Cloud9's baron and extending 
              the game to a second baron. That being said, this team is not a playoff team as it stands now, and we'll need more time to see 
              how the Keith experiment will develop. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Evil Geniuses (1-1), Immortals (1-1)</p>
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b> (1-1) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> FlyQuest (L), TSM (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Overall, I was very not impressed with Immortals at all this week. Maybe I still feel sour about having to watch that 60 minute atrocity, 
              but it really felt like both Immortals and TSM just looked awful. I also have draft concerns with this team based on the Trundle pick for 
              Xmithie FlyQuest's team composition (no disrespect to Xmithie, he has proven to be a great Trundle player). That being said, I think they 
              did make some good macro descisions against TSM, and thats ultimately how I think they will be successful. I don't think this team has a 
              lot of fire-power, but if they have good teamplay and leadership from Xmithie and sOAZ, then they have a slim chance to be successful.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Cloud9 (2-0), Golden Guardians (0-2)</p>
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b> (0-2) [-6]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (L), FlyQuest (L)</p>
            <p className="flow-text rankings-section-text left-align">
              This drop for CLG might be a huge overreaction but oh boy did they look really bad. It looked like none of them were on the same page 
              with what they wanted to do, which was most evident when Crown died mid early on, and Wiggly flashed in after the fact (presumably 
              thinking his team was closer than they were) only to die too. On paper, this team should be a top 4 team, bringing in Crown and 
              Smoothie over PowerOfEvil and Biofrost from their 3rd place Summer Split team, but they look like a farcry from a playoff team 
              right now. I am hoping a lot of this is because of Crown's visa issues and that he hasn't been here for very long yet, and with 
              more time they will return to form, but if they don't get their act together soon they could be sitting with an 0-4 record without 
              having played Cloud9 or Team Liquid. 
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (1-1), TSM (0-2)</p> 
          </div>  
        </div>
      </div>
    );
  }
}

export default LcsPowerRankingsWeek1;