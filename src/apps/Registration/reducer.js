import * as actiontypes from './actiontypes';


const registrationInitialState = {
    loadingApi: false,
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
