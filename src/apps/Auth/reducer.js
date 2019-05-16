import * as actiontypes from './actiontypes';


const API_KEY_LOCAL_STORAGE = 'apikey';

const isUserAuthenticated = () => {
    return !!loadApiKey()
};

const loadApiKey = () => {
    const key = localStorage.getItem(API_KEY_LOCAL_STORAGE);
    return key === null ? false : key;
};

const saveApiKey = (key) => {
    localStorage.setItem(API_KEY_LOCAL_STORAGE, key)
};

const clearApiKey = ()=>{
    localStorage.removeItem(API_KEY_LOCAL_STORAGE)
};

const authInitialState = {
    loading: false,
    isAuthenticated: isUserAuthenticated(),
    user: null,
    requestErrors: {}
};

export default function authReducer(state = authInitialState, action) {

    switch (action.type) {

        case actiontypes.LOGIN: {
            return {
                ...state,
                loading: true,
            };
        }
        case actiontypes.LOGIN_SUCCESS: {
            saveApiKey(action.data.token);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.data,
            };
        }
        case actiontypes.LOGIN_FAILED: {
            return {
                ...state,
                loading: false,
                requestErrors: action.errors,
            };
        }

        case actiontypes.LOGOUT: {
            //TODO Убрать clearApiKey();
            clearApiKey();
            return {
                ...state,
                //TODO Убрать isAuthenticated: false,
                isAuthenticated: false,
                loading: true,
            };
        }
        case actiontypes.LOGOUT_SUCCESS: {
            clearApiKey();
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
            };
        }
        case actiontypes.LOGOUT_FAILED: {
            return {
                ...state,
                loading: false,
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
