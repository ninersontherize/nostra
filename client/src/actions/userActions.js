import axios from "axios";

import {
  GET_ERRORS
} from "./types";

//show info for a user
export const showUser = userData => dispatch => {
  return axios
    .get(`/api/users/${userData}/showUser`)
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

export const getFollowing = userData => dispatch => {
  return axios
    .get("/api/followers/followers", {
      params: {
        type: "followees",
        search: userData
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

