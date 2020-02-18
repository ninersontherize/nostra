import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek3 extends Component {
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
              This week of LCS saw lots of interesting games and upsets that thew the 
              standings into turmoil. Many of the early season darlings fell from grace, 
              and we saw some of the early duds rise from the ashes. As a result, these 
              rankings are going to shake up quite a bit.
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
                  Week 3
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                  Previous Weeks: <Link to="/lcsPowerRankings/week0">0</Link> <Link to="/lcsPowerRankings/week1">1</Link> <Link to="/lcsPowerRankings/week2">2</Link>
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b> (6-0) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> FlyQuest (W), Dignitas (W)</p>
            <p className="flow-text rankings-section-text left-align">
              The only real question/qualm about Cloud9 I had so far was that they had played a relatively play weak schedule so far compared to other 
              teams. After decimating FlyQuest and Dignitas however, it is clear there is a large gap between Cloud9 and the rest of the league right 
              now. They are always on the same page about how they want to play the game, and once they get a lead they systematically choke their 
              opponents out of the game, Blaber in particular has been very impressive, being the best jungler in the LCS by far over the first 3 weeks. 
              Looking to next week, Cloud9 has some very exciting matchups against TSM, and a grudge match of sorts against Svenskeren, Kumo, Zeyzal, 
              and Evil Geniuses.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (4-2), Evil Geniuses (2-4)</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b> (4-2) [+3]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Dignitas (W), Golden Guardians (W)</p>
            <p className="flow-text rankings-section-text left-align">
              TSM are on a roll now, winning 4 games in a row. They are also looking much more cohesive and decisive in their mid-game strategy, 
              closing both of their games out before 35 minutes. Broken Blade in particular looks incredible, making a case for himself as a top 
              2 top laner in the league along with Licorice. TSM make this big jump not only from their own performances, but also as a result of 
              some disappointing performances from the teams in front of them. A real test for this team will be their match against Cloud9 next 
              week. If your a TSM fan you realistically want them to win, but I would at least like to see them get a good lead in one lane to make 
              Cloud9 play from behind in some aspect, since they've been ahead in every lane all season long.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Cloud9 (6-0), FlyQuest (3-3)</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b> (3-3) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (L), Cloud9 (L)</p>
            <p className="flow-text rankings-section-text left-align">
              Dignitas faced a huge test this week against Cloud9 vs TSM, but unfortunately they failed pretty miserably. They didn't look like 
              they were in either of those games for very long. Now after starting 3-0, they are currently riding a 3 game losing streak. I think 
              Dignitas can turn it around though, and based on the teams they are playing can likely go at least 2-1 to end the first half of the 
              split at at least 5-4. I think they will need to go 2-0 this week to really seperate themselves from the giant clump that has formed 
              in the middle of the standings and establish themselves as a playoff contender. For now though, I will put them just at the top of 
              the clump as they look to distance themselves a bit.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> 100 Thieves (3-3), Golden Guardians (2-4)</p>
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b> (3-3) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Cloud9 (L), Evil Geniuses (L)</p>
            <p className="flow-text rankings-section-text left-align">
              FlyQuest, much like Dignitas, fell flat on their face this week with an opportunity to seperate themselves. The Cloud9 loss is expected, 
              but the loss against Evil Geniuses loss really hurts with how EG looked to start the season. They didn't seem to have any answer to Evil 
              Geniuses when they established their bot heavy plan early on, and seemed like they didn't know what to do later on as well. We know the 
              potential is there based on their first few games, but they have some difficult games against TSM and 100 Thieves that may be a precursor 
              to how the rest of their season will go
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> TSM (4-2), 100 Thieves (3-3)</p>
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b> (4-2) [+3]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> 100 Thieves (W), CLG (W)</p>
            <p className="flow-text rankings-section-text left-align">
              Immortals is somehow 4-2. I'm not sure how exactly but they are. Their wins haven't been pretty or dominant by any means, but they 
              are scraping them together. The veteran experience of sOAZ seems to be paying dividends, as he bodied SSumday in the Chogath vs 
              Gangplank matchup, and although he didn't look particularly impressive in their win against CLG, made the clutch call for Altec 
              and Eika to backdoor and win the game. I was also encouraged by Altec's performance in that game against CLG; he might be Immortals 
              best carry potential. Eika, however, looked very undwhelming especially how many resources he was given throughout the early and 
              mid-game. Immortals surely must be happy with their record right now, but we will wait to see if this is sustainable.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b>Team Liquid (2-4), Evil Geniuses (2-4)</p>
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b> (2-4) [-3]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b>100 Thieves (L), Golden Guardians (L)</p>
            <p className="flow-text rankings-section-text left-align">
              On the bright side for Team Liquid, Broxah's visa was approved and he should be coming soon. Unfortunately that is about the only positive 
              thing you can look at with Team Liquid after their performance this week. They went 0-2 against a coinflip 100 Thieves team, and a Golden 
              Guardians team who everyone put at the bottom of the league before the season. They're problems seem like they're much bigger than jungle 
              too. Doublelift died 2v2 in lane against Kieth and FBI, which is a sentence I'd never thought I'd say. You have to believe that at some 
              point the 4-time consecutive LCS Champions will figure things out, but its looking very rough right now. Feel especially bad for Shernfire, 
              who was put on the spot and could get an unfair shake from people because of Team Liquid's record.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Immortals (4-2), CLG (1-5)</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_small.png"} /> <b>100 Thieves</b> (3-3) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Team Liquid (W), Immortals (L)</p>
            <p className="flow-text rankings-section-text left-align">
              100 Thieves had a very coinflip week. They came out against Team Liquid and completely dominated them in all phases of the game, although 
              they had some trouble closing it out at the end. However, against Immortals they lost early game and were completely choked out and couldn't 
              find a way back in. Ssumday hard carried against Team Liquid, and looked terrible against Immortals. This team has shown flashes of promise 
              at times, but will need to find more consistent form if they want to position themselves for playoffs.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Dignitas (3-3), FlyQuest (3-3)</p>
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b> (2-4) [-1]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> CLG (L), FlyQuest (W)</p>
            <p className="flow-text rankings-section-text left-align">
              A grim start to the season continued as Evil Geniuses gave CLG their first win of the split. They came back the next day though 
              and put on a clinic against FlyQuest. I really liked a lot of the things they did in that game. They had a clear, focused gameplay 
              that involved pressure bot-side early which converted into objectives that helped them snowball the game, and FlyQuest had no 
              answers. They drafted a comp that put Bang on a traditional carry in Xayah, and Jizuke's on Malzahar, which made their composition 
              much easier to execute. The synergy/coordination between the rest of the team and Svenskeren looked much better too. I think this team 
              is still very hard to get a good read on, and they have a lot of improvement to do, but their last game is a very encouraging sign that 
              the team is starting to find their identity.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Next Week: Immortals (4-2), Cloud9 (6-0)</p>
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b> (2-4) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> TSM (L), Team Liquid (W)</p>
            <p className="flow-text rankings-section-text left-align">
              If are a Golden Guardians fan and saw you had TSM and Team Liquid this week, you should be estatic with a 1-1 week. Their win against 
              Team Liquid wasn't necessarily close either, winning bot early, staying in control for a lot of the game (other than Goldenglue's deaths 
              being caught out), and snowballing a brilliant baron sneak into a win. Keith heard everyone talking shit and then casually killed Doublelift 
              in lane as well. From what they have said, they haven't been able to translate their scrim results to stage very well, but we got a glimpse 
              on Monday into a Golden Guardians team that can compete for a playoff spot if they can continue to keep that form.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> CLG (1-5), Dignitas (3-3)</p>
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b> (1-5) [-]
            </h4>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Last Week:</b> Evil Geniuses (W), Immortals (L)</p>
            <p className="flow-text rankings-section-text left-align">
              CLG finally got on the board, picking up their first win against an Evil Geniuses team still looking to find their identity. They realistically 
              should have had a 2-0 week as they were in a position to take baron and possibly the game against Immortals; however, mired by indecisiveness 
              they pulled off the baron and allowed it to reset, and then went back to it while Immortals would just end up pushing mid all the way for the win. 
              If you look at the roster, the players are all there. Stixxay and Wiggly looked great in 2019 Summer Split, and Crown dragged Optic into playoffs 
              last year, but its clear that this team is having issues in cohesion and communication that are seriously inhibiting their ability to play the 
              game well.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Next Week:</b> Golden Guardians (2-4), Team Liquid (2-4)</p>
          </div>  
        </div>
      </div>
    );
  }
}

export default LcsPowerRankingsWeek3;