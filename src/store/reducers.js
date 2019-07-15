import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import history from 'utils/history';
import authenticationReducer from 'apps/Auth/reducer'
import dictionariesReducer from 'apps/Dictionaries/reducer'

export default function createReducer(injectedReducers) {
    return combineReducers({
        router: connectRouter(history),
        authentication: authenticationReducer,
        dictionaries: dictionariesReducer,
        ...injectedReducers,
    });
}