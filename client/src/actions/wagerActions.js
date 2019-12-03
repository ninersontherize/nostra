import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//Create League
export const createWager = (wagerData, history) => dispatch => {
  console.log(wagerData);
  axios
    .post("/api/wagers/createWager", wagerData)
    .then(res => history.push("/searchMatch")) //re-direct to searchMatch on successful creation
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
    .get(`api/wagers/${user_id}/myWagers`)
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
    .get(`api/leagues/${user_league_id}/userLeague`)
    .then(res => {return res.data;})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}