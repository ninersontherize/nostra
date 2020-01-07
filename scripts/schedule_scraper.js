const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://lol.gamepedia.com';
const LEAGUE = process.argv[2];
const YEAR = process.argv[3];
const SPLIT = process.argv[4];
if (!LEAGUE || !YEAR || !SPLIT) {
    throw "Please provide all required cl arguments";
}

(async () => {
  console.log(`${BASE_URL}/${LEAGUE}/${YEAR}_Season/${SPLIT}_Season`);
  /* Send the request to the user page and get the results */
  let response = await request(`${BASE_URL}/${LEAGUE}/${YEAR}_Season/${SPLIT}_Season`)

  /* Start processing the response */
  let $ = cheerio.load(response);

  let home_team = "";
  let away_team = "";
  let match_count = 1;
  let match_day = "";
  let match_month = "";
  let match_date = [];
  let concat_date = "";
  let match_set = [];

  //grab schedule info
  for(let j = 0; j < 9; j++) {
    $($(`tr.ml-allw.ml-w${j+1}.matchlist-date.matchlist-you-date.ofl-toggle-2-1.ofl-toggle-2-2.ofl-toggler-2-all`).children()).each((i, elm) => {
      split_date = $(elm).text().split(",");
      if (split_date[1] < 10) {
        match_month = `0${split_date[1]}`
      } else {
        match_month = split_date[1];
      }

      if (split_date[2] < 10) {
        match_day = `0${split_date[2]}`
      } else {
        match_day = split_date[2];
      }
      concat_date = `${split_date[0]}-${match_month}-${match_day}T${split_date[3]}:${split_date[4]}:00.000Z`
      match_date[i] = concat_date;
    });
    $($(`tr.ml-allw.ml-w${j+1}.ml-row`).children()).each((i, elm) => {
      if (home_team === "") {
        if ($(elm).find('span.teamname').text() != "") {
          if ($(elm).find('span.teamname').text() === "100") {
            home_team = "100T"
          } else if ($(elm).find('span.teamname').text() === "GG") {
            home_team = "GGS"
          } else {
            home_team = $(elm).find('span.teamname').text();
          }
        }
      } else if (away_team === "") {
        if ($(elm).find('span.teamname').text() != "") {
          if ($(elm).find('span.teamname').text() === "100") {
            away_team = "100T"
          } else if ($(elm).find('span.teamname').text() === "GG") {
            home_team = "GGS"
          } else {
            away_team = $(elm).find('span.teamname').text();
          }
        }
      } else {
        match_set[((j * 10) + (match_count - 1))] = {
          tournament: LEAGUE,
          split: `${SPLIT} ${YEAR}`,
          home_team: home_team,
          away_team: away_team,
          match_date: match_date[match_count - 1]
        };
        match_count++;
        home_team = "";
        away_team = "";
        if ($(elm).find('span.teamname').text() != "") {
          if ($(elm).find('span.teamname').text() === "100") {
            home_team = "100T"
          } else if ($(elm).find('span.teamname').text() === "GG") {
            home_team = "GGS" 
          } else {
            home_team = $(elm).find('span.teamname').text();
          }
        }
      }

      if (match_count === 10 && away_team !== "") {
        match_set[((j * 10) + (match_count - 1))] = {
          tournament: LEAGUE,
          split: `${SPLIT} ${YEAR}`,
          home_team: home_team,
          away_team: away_team,
          match_date: match_date[match_count - 1]
        };
      }


    });
    match_count = 1;
    match_date = [];
  }
  console.log(JSON.stringify(match_set));


})();