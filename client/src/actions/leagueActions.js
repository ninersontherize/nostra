import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//Create League
export const createLeague = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/leagues/createLeague", userData)
    .then(res => history.push("/myLeagues")) //re-direct to dashboard on successful creation
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Search for League
export const searchLeague = searchData => dispatch => {
  return axios
    .get("/api/leagues/leagues", {
      params: {
        search: searchData
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//show info for one specific league
export const showLeague = searchData => dispatch => {
  return axios
    .get(`/api/leagues/${searchData}/leagues`)
    .then(res => {
      return res.data;
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get league ids for a specific user -> returns userleague objects
export const getMyLeagues = searchData => dispatch => {
  return axios
    .get("/api/leagues/getMyLeagues", {
      params: {
        user_id: searchData
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//show info for one specific league
export const showUserLeague = searchData => dispatch => {
  return axios
    .get(`/api/leagues/${searchData}/userLeague`)
    .then(res => {
      return res.data;
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Join a league
export const joinLeague = (joinData, history) => dispatch => {
  axios
    .post("/api/leagues/addUserLeague", joinData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentPlayers = leagueData => dispatch => {
  return axios
    .get("/api/leagues/getCurrentPlayers", {
      params: {
        league_id: leagueData
      }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const checkCurrentUserMembership = userData => dispatch => {
  return axios
    .get("/api/leagues/checkCurrentUserMembership", {
      params: {
        user_id: userData.user_id,
        league_id: userData.league_id
      }
    })
    .then(res => {
      return res.data
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};