import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import history from 'utils/history';
import authenticationReducer from 'apps/Auth/reducer'
import messagesReducer from 'apps/Messages/reducer'
import clientCommonReducer from 'apps/Client/reducer'
import dictionariesReducer from 'apps/Dictionaries/reducer'
import clientNewsReducer from 'apps/ClientNews/reducer'

export default function createReducer(injectedReducers) {
    return combineReducers({
        router: connectRouter(history),
        authentication: authenticationReducer,
        messages: messagesReducer,
        dictionaries: dictionariesReducer,
        client_common: clientCommonReducer,
        club_news: clientNewsReducer,
        ...injectedReducers,
    });
}