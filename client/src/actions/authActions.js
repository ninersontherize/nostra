import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS
} from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) //re-direct to login on successful register
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localStorage
      const { token } = res.data;
      //Set token to localStorage
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//send email with unique token to reset password
export const sendForgotEmail = (userData, history) => dispatch => {
  axios
    .post("/api/users/forgotPassword", userData)
    .then(res => history.push("/emailSent")) //send to static success page on success
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const validateToken = tokenData => dispatch => {
  return axios
    .post("/api/users/validateToken", tokenData)
    .then(res => {
      return res.data.email;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updatePassword = (userData, history) => dispatch => {
  axios 
    .put("/api/users/updatePassword", userData)
    .then(res => {
      history.push("/login"); 
    }) //re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
