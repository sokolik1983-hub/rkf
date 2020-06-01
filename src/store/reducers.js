import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../utils/history";
import authenticationReducer from "../pages/Login/reducer";
import dictionariesReducer from "../dictionaries/reducer";
import homePageReducer from "../pages/Home/reducer";

export default function createReducer(injectedReducers) {
    return combineReducers({
        router: connectRouter(history),
        authentication: authenticationReducer,
        dictionaries: dictionariesReducer,
        homepage: homePageReducer,
        ...injectedReducers,
    });
}