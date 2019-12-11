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

//get all users that a given user is following
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

//get all followers of a given user is following
export const getFollowers = userData => dispatch => {
  return axios
    .get("/api/followers/followers", {
      params: {
        type: "followers",
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

//check to see if a user is following another user
export const checkFollowed = (follower, followee) => dispatch => {
  return axios
    .get("/api/followers/checkFollowed", {
      params: {
        follower: follower,
        followee: followee
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

//create new follower record
export const followUser = followData => dispatch => {
  axios
    .post("/api/followers/createFollower", followData)
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};