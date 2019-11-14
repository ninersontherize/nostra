import axios from "axios";

import {
  GET_ERRORS
} from "./types";
import errorReducer from "../reducers/errorReducer";

//Register User
export const createLeague = (userData, history) => dispatch => {
  axios
    .post("/api/leagues/createLeague", userData)
    .then(res => history.push("/dashboard")) //re-direct to dashboard on successful creation
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
      return res.data
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
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};