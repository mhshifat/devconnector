import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducers from "./reducers";

const initialState = {};

const store = createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(...[thunk]),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
