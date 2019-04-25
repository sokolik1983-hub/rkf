import * as actiontypes from './actiontypes';


const registrationInitialState = {
    loadingApi: false,
    registrationComplete: false
};

export default function demoReducer(state = registrationInitialState, action) {

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
            };
        }

        default:
            return state;
    }
}
