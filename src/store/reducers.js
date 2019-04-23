import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import authenticationReducer from 'apps/Auth/reducer'

export default function createReducer(injectedReducers) {
    return combineReducers({
        routing: routerReducer,
        authentication: authenticationReducer,
        ...injectedReducers,
    });
}