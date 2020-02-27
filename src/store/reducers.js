import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import authenticationReducer from "../pages/Login/reducer";
// import messagesReducer from 'apps/Messages/reducer'
// import clientCommonReducer from 'apps/Client/reducer'
import dictionariesReducer from 'apps/Dictionaries/reducer'
import homePageReducer from 'pages/Home/reducer';

export default function createReducer(injectedReducers) {
    return combineReducers({
        router: connectRouter(history),
        authentication: authenticationReducer,
        // messages: messagesReducer,
        dictionaries: dictionariesReducer,
        homepage: homePageReducer,
        // client_common: clientCommonReducer,
        ...injectedReducers,
    });
}