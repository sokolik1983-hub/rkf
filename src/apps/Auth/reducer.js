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

const clearApiKey = () => {
    localStorage.removeItem(API_KEY_LOCAL_STORAGE)
};

const loadUserInfo = () => {
    const user_info = localStorage.getItem("user_info");
    return user_info === null ? false : JSON.parse(user_info);
};

const saveUserInfo = (user_info) => {
    localStorage.setItem("user_info", JSON.stringify(user_info))
};

const clearUserInfo = () => {
    localStorage.removeItem("user_info")
};

const loadRolesWithActions = () => {
    const rolesWithActions = localStorage.getItem("rolesWithActions");
    return rolesWithActions === null ? false : JSON.parse(rolesWithActions);
};

const saveRolesWithActions = (rolesWithActions) => {
    localStorage.setItem("rolesWithActions", JSON.stringify(rolesWithActions))
};

const clearRolesWithActions = () => {
    localStorage.removeItem("rolesWithActions_info")
};


const authInitialState = {
    loading: false,
    isAuthenticated: isUserAuthenticated(),
    user_info: loadUserInfo(),
    requestErrors: {},
    roles_with_actions: loadRolesWithActions(),
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

            const {access_token, user_info, roles_with_actions} = action.data;
            saveApiKey(access_token);
            saveUserInfo(user_info);
            saveRolesWithActions(roles_with_actions);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user_info,
                roles_with_actions
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
            clearUserInfo();
            clearRolesWithActions();
            return {
                ...state,
                //TODO Убрать isAuthenticated: false,
                isAuthenticated: false,
                user_info: null
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
