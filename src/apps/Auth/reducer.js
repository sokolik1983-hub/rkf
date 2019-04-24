import * as actiontypes from './actiontypes';


const authInitialState = {
    loadingApi: false,
    isAuthenticated: false,
    user: null,
    requestErrors: {}
};

export default function authReducer(state = authInitialState, action) {

    switch (action.type) {

        case actiontypes.LOGIN: {
            return {
                ...state,
                loadingApi: true,
            };
        }
        case actiontypes.LOGIN_SUCCESS: {
            return {
                ...state,
                loadingApi: false,
                isAuthenticated: true,
                user: action.data,
            };
        }
        case actiontypes.LOGIN_FAILED: {
            return {
                ...state,
                loadingApi: false,
                requestErrors: action.errors,
            };
        }

        case actiontypes.CLEAR_REQUEST_ERRORS: {
            return {
                ...state,
                requestErrors: {},
            }
        }

        default:
            return state;
    }
}
