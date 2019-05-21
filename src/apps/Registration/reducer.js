import * as actiontypes from './actiontypes';


const registrationInitialState = {
    loading: false,
    registrationComplete: false,
    requestErrors: {}
};

export default function registrationReducer(state = registrationInitialState, action) {

    switch (action.type) {

        case actiontypes.REGISTER: {
            return {
                ...state,
                loading: true,
            };
        }
        case actiontypes.REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false,
                registrationComplete: true,
            };
        }
        case actiontypes.REGISTER_FAILED: {
            return {
                ...state,
                loading: false,
                requestErrors: action.errors
            };
        }

        default:
            return state;
    }
}
