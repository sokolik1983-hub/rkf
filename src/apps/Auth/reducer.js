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

const saveProfile = (profile_id) => {
    localStorage.setItem("profile_id", JSON.stringify(profile_id))
};

const loadProfile = () => {
    const profile_id = localStorage.getItem("profile_id");
    return profile_id === null ? null : parseInt(profile_id, 10);
};

const clearProfile = (profile) => {
    localStorage.removeItem("profile_id")
};


const authInitialState = {
    loading: false,
    isAuthenticated: isUserAuthenticated(),
    user_info: loadUserInfo(),
    requestErrors: {},
    profile_id: loadProfile(),
    roles_with_actions: loadRolesWithActions(),
};

const authReducer = createReducer(authInitialState, {

    [actiontypes.LOGIN_SUCCESS](state, action) {
        const {access_token, user_info, roles_with_actions, profile_id} = action.data;
        saveApiKey(access_token);
        saveUserInfo(user_info);
        saveRolesWithActions(roles_with_actions);
        saveProfile(profile_id);
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user_info,
            roles_with_actions,
            profile_id
        };
    },

    [actiontypes.LOGOUT](state, action) {
        //TODO Убрать clearApiKey();
        clearApiKey();
        clearUserInfo();
        clearRolesWithActions();
        clearProfile();
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
