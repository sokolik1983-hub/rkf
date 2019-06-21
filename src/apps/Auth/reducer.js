import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

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

const authReducer = createReducer(authInitialState, {

    [actiontypes.LOGIN_SUCCESS](state, action) {
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
    },

    [actiontypes.LOGOUT](state, action) {
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
    },
    [actiontypes.LOGOUT_SUCCESS](state, action) {
        clearApiKey();
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
        };
    },
    [actiontypes.LOGOUT_FAILED](state, action) {
        return {
            ...state,
            loading: false,
            requestErrors: action.errors,
        };
    },

});

export default authReducer;
