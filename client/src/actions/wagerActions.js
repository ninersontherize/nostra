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