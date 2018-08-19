import axios from "axios";
import JWTDecode from "jwt-decode";
import { SAVE_ERRORS_TO_REDUX_STATE, USER_INFO, LOGOUT } from "./types";

export const userRegisterAction = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: SAVE_ERRORS_TO_REDUX_STATE,
        payload: err.response.data
      })
    );
};

export const userLoginAction = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      localStorage.setItem("devconnector", res.data.token);
      if (res.data.token) {
        axios.defaults.headers.common["Authorization"] = res.data.token;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
      const decode = JWTDecode(res.data.token);
      dispatch({
        type: USER_INFO,
        payload: decode
      });
    })
    .catch(err =>
      dispatch({
        type: SAVE_ERRORS_TO_REDUX_STATE,
        payload: err.response.data
      })
    );
};

export const userLogoutAction = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
