import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import demoReducer from 'apps/Demo/reducer'

export default function createReducer(injectedReducers) {
    return combineReducers({
        routing: routerReducer,
        ddd: demoReducer,
        ...injectedReducers,
    });
}