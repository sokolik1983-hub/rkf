import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const registrationInitialState = {
    loading: false,
    registrationComplete: false,
    requestErrors: {}
};

const registrationReducer = createReducer(registrationInitialState, {
    [actiontypes.REGISTER](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.REGISTER_SUCCESS](state, action) {
        return {
            ...state,
            loading: false,
            registrationComplete: true,
        };
    },
    [actiontypes.REGISTER_FAILED](state, action) {
        return {
            ...state,
            loading: false,
            requestErrors: action.errors
        };
    },
});

export default registrationReducer