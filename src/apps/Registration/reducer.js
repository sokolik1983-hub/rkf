import * as actiontypes from './actiontypes';


const registrationInitialState = {
    loadingApi: false,
    registrationComplete: true,
    requestErrors: {}
};

export default function registrationReducer(state = registrationInitialState, action) {

    switch (action.type) {

        case actiontypes.REGISTER: {
            return {
                ...state,
                loadingApi: true,
            };
        }
        case actiontypes.REGISTER_SUCCESS: {
            return {
                ...state,
                loadingApi: false,
                registrationComplete: true,
            };
        }
        case actiontypes.REGISTER_FAILED: {
            return {
                ...state,
                loadingApi: false,
                requestErrors: action.errors
            };
        }

        default:
            return state;
    }
}
