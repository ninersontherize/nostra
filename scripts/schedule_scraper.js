const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://lol.gamepedia.com/LCS/2019_Season/Summer_Season';
//const LEAGUE = process.argv[2];
//const YEAR = process.argv[3];
//const SPLIT = process.argv[4];
//if (!LEAGUE || !YEAR || !SPLIT) {
//    throw "Please provide all required cl arguments";
//}   let response = await request(`${BASE_URL}/${LEAGUE}/${YEAR}/${SPLIT}`);

(async () => {

  /* Send the request to the user page and get the results */
  let response = await request(`${BASE_URL}`);

  /* Start processing the response */
  let $ = cheerio.load(response);

  let schedule = [];
  let home_team = "";
  let away_team = "";
  let match_count = 1;
  //grab schedule info
  console.log("Week 1");
  $($('tr.ml-allw.ml-w2.ml-row').children()).each((i, elm) => {
    if (home_team === "") {
      if ($(elm).find('span.teamname').text() != "") {
        home_team = $(elm).find('span.teamname').text();
      }
    } else if (away_team === "") {
      if ($(elm).find('span.teamname').text() != "") {
        away_team = $(elm).find('span.teamname').text();
      }
    } else {
      console.log("Match " + match_count);
      console.log(home_team);
      console.log(away_team);
      match_count++;
      home_team = "";
      away_team = "";
      if ($(elm).find('span.teamname').text() != "") {
        home_team = $(elm).find('span.teamname').text();
      }
    }

    if (match_count === 10 && away_team !== "") {
      console.log("Match " + match_count);
      console.log(home_team);
      console.log(away_team);
    }

    //schedule[i - 1] = {
    //  tournament = "LCS" //change to LEAGUE when implemented,
    //  home_team: parseFloat($(elm).find('div.ChampionMinionKill').text().split('(')[1].split(')')[0]),
    //  away_team: parseFloat($(elm).find('span.KDA').text().split(':')[0]),
    //  match_date: parseInt($(elm).find('div.WinRatio').text().replace(/\s+/g, "").split('%')[0]),
    //  time: parseInt($(elm).find('div.Title').text().split(" ")[0])
    //}

    
  });


})();