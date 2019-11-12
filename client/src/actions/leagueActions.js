import axios from "axios";

import {
  GET_ERRORS
} from "./types";

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