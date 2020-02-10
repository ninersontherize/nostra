import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//Search for Match
export const searchMatch = searchData => dispatch => {
  return axios
    .get("/api/matches/matches", {
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

//Search for Match by Date range
export const searchMatchByDateRange = searchData => dispatch => {
  return axios
    .get("/api/matches/matchesByDate", {
      params: {
        start_date: searchData.start_date,
        end_date: searchData.end_date,
        order: searchData.order
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

//show info for one specific match
export const showMatch = searchData => dispatch => {
  return axios
    .get(`/api/matches/${searchData}/match`)
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

export const updateTeamRecords = teamId => dispatch => {
  axios
    .put(`api/teams/${teamId}/updateRecord`)
    .then(res => res.data)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateMatchTeams = matchId => dispatch => {
  axios
    .put(`/api/matches/${matchId}/getLatestTeams`)
    .then(res => res.data)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setResult = (matchId, matchData) => dispatch => {
  axios
    .put(`/api/matches/${matchId}/setResult`, matchData)
    .then(res => res.data)
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
