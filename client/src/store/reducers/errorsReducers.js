import { SAVE_ERRORS_TO_REDUX_STATE } from "../actions/types";

const initialState = {};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ERRORS_TO_REDUX_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default authReducers;
