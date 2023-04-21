import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {reducers} from "../Redux/Reducers";

//Create redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)

