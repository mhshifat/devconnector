import { USER_INFO, LOGOUT } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};

export default authReducers;
