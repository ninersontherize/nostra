import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//Create Wager
export const createWager = (wagerData, history) => dispatch => {
  console.log(wagerData);
  axios
    .post("/api/wagers/createWager", wagerData)
    .then(res => history.push("/dashboard")) //re-direct to searchMatch on successful creation
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get myWagers
export const getMyWagers = user_id => dispatch => {
  return axios
    .get(`/api/wagers/${user_id}/myWagers`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get myOpenWagers
export const getMyOpenWagers = (user_id, user_league_id)  => dispatch => {
  return axios
    .get(`/api/wagers/${user_id}/myOpenWagers`, {
      params: {
        user_league_id: user_league_id
      }
    })
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get myClosedWagers
export const getMyClosedWagers = user_id => dispatch => {
  return axios
    .get(`/api/wagers/${user_id}/myClosedWagers`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get user_league
export const getLeagueInfo = user_league_id => dispatch => {
  return axios
    .get(`/api/leagues/${user_league_id}/userLeague`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get top 5 biggest wins for a given user
export const getTopWins = userInfo => dispatch => {
  return axios
    .get(`/api/wagers/topWins/${userInfo}`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get top 5 biggest losses for a given user
export const getTopLosses = userInfo => dispatch => {
  return axios
    .get(`/api/wagers/${userInfo}/topLosses`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get wagers by match
export const getWagersByMatch = matchId => dispatch => {
  return axios
    .get(`/api/wagers/${matchId}/wagersByMatch`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get wagers by match
export const getLosingWagersByMatch = matchId => dispatch => {
  return axios
    .get(`/api/wagers/${matchId}/losingWagersByMatch`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete Wager by wager id
export const deleteWager = wagerId => dispatch => {
  return axios
    .delete(`/api/wagers/${wagerId}/deleteWager`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update match odds
export const updateMatchOdds = (matchId, oddsInfo, history) => dispatch => {
  axios
    .put(`/api/matches/${matchId}/updateMatchOdds`, oddsInfo)
    .then(res => history.push(`/adminMatchSearch`)) //re-direct to searchMatch on successful creation
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update match odds
export const resolveWagers = matchId => dispatch => {
  axios
    .put(`/api/wagers/${matchId}/resolveWagers`)
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update match odds
export const resolveParlays = history => dispatch => {
  axios
    .put(`/api/wagers/resolveParlays`)
    .then(res => history.push(`/adminMatchSearch`)) //re-direct to searchMatch on successful creation
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Update match odds
export const rollbackWagers = matchId => dispatch => {
  axios
    .put(`/api/wagers/${matchId}/rollbackWagers`)
    .then(res => {return res.data;}) 
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Create Parlay
export const createParlay = (wagerData, history) => dispatch => {
  console.log(wagerData);
  axios
    .post("/api/wagers/createParlay", wagerData)
    .then(res => history.push("/dashboard")) //re-direct to searchMatch on successful creation
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Show Parlay
export const showParlay = wager_id => dispatch => {
  return axios
    .get(`/api/wagers/${wager_id}/showParlay`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Show Parlay
export const showWager = wager_id => dispatch => {
  return axios
    .get(`/api/wagers/${wager_id}/wagers`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};