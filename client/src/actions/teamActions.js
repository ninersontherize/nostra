import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//show info for a team
export const showTeam = teamData => dispatch => {
  return axios
    .get(`/api/teams/${teamData}/showTeam`)
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

//get teams
export const getTeams = teamData => dispatch => {
  return axios
    .get(`/api/teams/teams`)
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

//update Team Records
export const updateRecord = teamId => dispatch => {
  axios
    .put(`/api/teams/${teamId}/updateRecord`)
    .then(res => res.data)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

