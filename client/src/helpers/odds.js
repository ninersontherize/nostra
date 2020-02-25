//render Odds for site
export const renderOdds = (odd_type, odd) => {
  console.log(odd_type);
  if(odd > 0 && odd_type === "spread") {
    return `+${odd/1000} K`;
  } else if (odd < 0 && odd_type === "spread") {
    return `${odd/1000} K`;
  } else if (odd > 0 && odd_type === "money_line") {
    return `+${odd}`;
  } else if (odd < 0 && odd_type === "money_line") {
    return odd;
  } else if (odd_type ==="parlay") {
    return `${parseFloat(odd).toFixed(2)}-1`
  } else {
    return odd;
  }
};

//renderOddType
export const renderOddType = odd_type => {
  if (odd_type === "spread") {
    return "Spread";
  } else if (odd_type === "money_line"){
    return "Money Line";
  } else if (odd_type === "parlay") {
    return "Parlay";
  } else {
    return "Over/Under"
  }
};

export const renderMatchTime = datetime => {
  let match_hour = (datetime.getHours() % 12);
  if (match_hour === 0) {
    match_hour = 12;
  }
  let match_minute = (datetime.getMinutes() < 10) ? "0" + datetime.getMinutes() : datetime.getMinutes();
  let match_trailer = (datetime.getHours() > 11) ? " PM PST" : " AM PST";
  return match_hour + ":" + match_minute + match_trailer;
};

export const renderMoney = money => {
  if (money === "") {
    return
  } else {
    return `${money}g`
  }
}

export const renderDifference = money => {
  if (money === "") {
    return
  } else {
    return `(+${money}g)`
  }
}