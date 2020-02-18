import React, { Component } from "react";
import { Link } from "react-router-dom";

class LcsPowerRankingsWeek0 extends Component {
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
              It’s 2020 and the LCS is back baby. After an offseason filled with interesting roster swaps shaking up the league, 
              its time to once again crown a champion. Will Team Liquid win their 5th straight split? Will Cloud9 finally step 
              to the plate and take the title? Can TSM redeem their last Spring Split? Will another team surprise everyone and 
              compete for the top spot? I may not have 2020 vision (ha), but here’s how I’m rating the teams coming into the split.
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
                  Preseason
                </span>
              </div>
              <div className="col s6 right-align">
                <span className="rankings-week-selector right-align">
                </span>
              </div>
            </div>
            <br />
            <h4 className="rankings-section-title left-align">
              1. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/liquid_small.png"} /> <b>Team Liquid</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              Team Liquid are coming off of their 4th consecutive LCS championship, but that wasn't enough for them, as a failure 
              in the world's group stage led to them changing their jungler from Xmithie to Broxah. Broxah has been a top 3 
              jungler in Europe for the past few years, and was argubably the best jungler at Worlds 2018, but Xmithie is also 
              the most successful NA jungler of all time. For Team Liquid this may be a "grass is always greener" situation 
              where they had the chance to get a great jungler in Broxah, but we'll have to see if this change will not only 
              continue their domestic success, but also propel them to international success.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Cloud9, TSM</p>
            <h4 className="rankings-section-title left-align">
              2. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/c9_small.png"} /> <b>Cloud9</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              After losing summer finals from up 2-1 against Team Liquid, and failing to make it out of the group stages for the 
              first time since 2015, Cloud9 decided it was time for changes. They sent Summer Split MVP Svenskeren, Support Zeyzal, 
              and Academy Top Laner Kumo to Evil Geniuses and parted with longtime member and memer Sneaky. In doing so, they 
              promoted Blaber to the starting Jungle position, signed Zven from TSM, and in one of the biggest moves of the 
              offseason paid a $1.5m buyout to acquire up-and-coming support Vulcan from Dignitas. I think a change of scene 
              will be good for Zven after all of the organizational/decision-making mess that happened at TSM last year, and 
              I am very high on Blaber. Based on this and the strength of Nisqy and Licorice last year, I think Cloud9 will 
              end up just ahead of TSM.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Team Liquid, Golden Guardians</p>
            <h4 className="rankings-section-title left-align">
              3. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/tsm_small.png"} /> <b>TSM</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              TSM this year decided that maybe having 3 junglers to choose from may not be sustainable. They parted with both 
              Grig and Akaadian and gave Dardoch the key to the jungle. It's a perfect marriage, a team that has been shuffling 
              through junglers as of late, and a jungler who has found himself shuffled across most teams in the league. With 
              Zven leaving, they also brough in another Dane, this time Kobbe from Splyce, and traded Smoothie to CLG to pick 
              up Biofrost. With all the pieces, this should be a top 3 team, but we'll have to see if all the pieces fit 
              together peacefully.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Immortals, Team Liquid</p>
            <h4 className="rankings-section-title left-align">
              4. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/clg_small.png"} /> <b>CLG</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              CLG had a revival in summer split of last year, making playoffs for the first time in 4 splits, with Wiggly and 
              Stixxay/Biofrost being the bright spots of this team. They keep most of their team from Summer Split, except trading 
              out PowerOfEvil for Crown, and trading Biofrost to TSM for Smoothie. According to CLG Smoothie is good for their time 
              since most of their team is quiet and Smoothie is a very vocal player. If Ruin can continue to improve and Wiggly 
              maintins his form, this is a team that could potentially be a sleeper to compete for the top spot.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Dignitas, FlyQuest</p>
            <h4 className="rankings-section-title left-align">
              5. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/100t_small.png"} /> <b>100 Thieves</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              100 Thieves was probably the most hyped up team coming in to 2018, but they fell flat on their face with a 10th 
              place finish in Spring, and just missing playoffs in Summer. PapaSmithy took over the helm at 100 Thieves and 
              immediately made a splash promoting Ssumday back to Top, bringing Meteos in to Jungle, and CodySun to Bot. Beyond 
              that, they brought in Ryoma from Australia, and promoted Stunt in for Support. Mid and Support may be somewhat of 
              an unknown commodity, but I think this team has a solid core and should be pretty successful.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Golden Guardians, Evil Geniuses</p>
            <h4 className="rankings-section-title left-align">
              6. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/eg_large.png"} /> <b>Evil Geniuses</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              Speaking of 100 Thieves, this team has some of the rumblings of the 100 Thieves from last year. Evil Geniuses acquired 
              the spot left by EchoFox, and immediately made a splash buying Summer Split MVP Svenskeren, Zeyzal, and Kumo from Cloud9, 
              and Bang from 100 Thieves. They then brought in Jizuke from Team Vitality in the LEC after an unsuccessful push to bring 
              in Chovy from the LCK team Griffin. I think if Bang can return to form, Svenskeren looks like he did in Summer and he can 
              unlock Jizuke once again, this team has a very high cieling. At the same time, this team has a lot of unknowns that can 
              go very wrong if they don't work out, so we'll have to see how well this roster gels. </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Dignitas, 100 Thieves</p>
            <h4 className="rankings-section-title left-align">
              7. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/dig_small.png"} /> <b>Dignitas</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              Dignitas come off making a miracle run in Summer Split all the way to the Worlds group stage. They come into Spring Split 
              with only 1/5 of that starting roster remaining in Huni, who they payed a pretty penny for (Damonte is in academy). To fill 
              out the rest of the roster, they brought in Grig from TSM to Jungle, Froggen from Golden Guardians to Mid, JohnSun from TSM 
              Academy to Bot, and Aphromoo from 100 Thieves to Support. I think this roster falls in the same boat as Evil Geniuses. If 
              Froggen can look like he did in Spring, Huni can look like he did in Summer, JohnSun can show why he is regarded as such 
              a soloq god, and Aphro can find his form again, this team could potentially be very good. It's just too many unknowns for 
              me to put a lot of faith in right now, but don't be surprised if this team with strong veteran presence comes out swinging.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Evil Geniuses, CLG</p>
            <h4 className="rankings-section-title left-align">
              8. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/fq_small.png"} /> <b>FlyQuest</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              FlyQuest secured themselves a 4th place finish and a semifinals spot in Spring Split last year, but then completely fell 
              apart in Summer and the Gauntlet. They aren't making very many changes though, keeping V1per, WildTurtle, and Santorin, 
              but bringing in PowerOfEvil in place of Pobelter, and Ignar in place of Wadid. Both of those should be upgrades for the team, 
              and they have a chance to show out in spring if their cohesion is good, but its hard for me to rate them as high when most 
              of this core was playing so poorly at the end of last year. I think this team can achieve a 4th place ceiling if everything 
              falls in to place though. </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> Immortals, CLG</p>
            <h4 className="rankings-section-title left-align">
              9. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/imt_small.png"} /> <b>Immortals</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              This is the part of the rankings where I believe we've hit the clear bottom of the league; which is weird to say since Immortals 
              brought back Xmithie to Jungle for them, who has been so successful in the past. Beyond that though they brough in sOAZ (who 
              looked quite bad last year) Altec (who was teamless last year), Eika from the French league, and Hakuho from Echofox. I look 
              at this team and I see potentially 3 losing lanes in terms of player skill compared to most teams in the league, so I'm worried 
              about who can carry games for them and how difficult of a time Xmithie will have jungling. The veteran presence of sOAZ and 
              Xmithie can potentially be advantageous if this team can play smart macro and make good decisions, but its hard to see this 
              team winning on skill.
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> FlyQuest, TSM</p>
            <h4 className="rankings-section-title left-align">
              10. <img className="rankings-logo-img" src={process.env.PUBLIC_URL + "/lcs/ggs_small.png"} /> <b>Golden Guardians</b>
            </h4>
            <p className="flow-text rankings-section-text left-align">
              Golden Guardians find themselves in last place in this power ranking, similar to their placement in their first two splits as 
              an org. They only retain Hauntzer and FBI from last year's team bringing in four new pieces, including Golden Guardians' Greyson 
              Gregory "Goldenglue" Gilmer to be their Midlaner. Beyond that, they brought in Closer (the MVP from the TCL region) to jungle, 
              and role-swapped Keith to Support (which is strange considering they already had a role-swapped support they were playing with 
              last year). It's hard to see this team being very successful given the circumstances, but hopefully GoldenGlue can show what 
              he's shown glimpses of in Cloud9 over the past couple of years, and this Keith thing can somehow work out. Who knows, he could 
              be the next CoreJJ
            </p>
            <p className="flow-text grey-text text-darken-1 rankings-section-sub-title left-align"><b>Week 1:</b> 100 Thieves, Cloud9</p>
          </div>  
        </div>
      </div>
    );
  }
}

export default LcsPowerRankingsWeek0;