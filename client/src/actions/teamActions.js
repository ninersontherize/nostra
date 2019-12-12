import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//show info for a user
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
