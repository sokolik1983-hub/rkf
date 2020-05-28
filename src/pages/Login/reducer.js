import * as actiontypes from "./actiontypes";
import createReducer from "../../utils/createReducer";

const loadApiKey = () => {
    const key = localStorage.getItem('apikey');
    return key === null ? false : key;
};
const saveApiKey = key => {
    localStorage.setItem('apikey', key);
};
const clearApiKey = () => {
    localStorage.removeItem('apikey');
};

const loadUserInfo = () => {
    const user_info = localStorage.getItem('user_info');
    return user_info === null ? null : JSON.parse(user_info);
};
const saveUserInfo = user_info => {
    localStorage.setItem('user_info', JSON.stringify(user_info));
};
const clearUserInfo = () => {
    localStorage.removeItem('user_info');
};

const loadIsActiveProfile = () => {
    const is_active_profile = localStorage.getItem('is_active_profile');
    return is_active_profile === null ? false : JSON.parse(is_active_profile);
};
const clearIsActiveProfile = () => {
    localStorage.removeItem('is_active_profile');
};
const saveIsActiveProfile = is_active_profile => {
    localStorage.setItem('is_active_profile', JSON.stringify(is_active_profile));
};

const loadProfile = () => {
    const profile_id = localStorage.getItem('profile_id');
    return profile_id === null ? null : parseInt(profile_id, 10);
};
const saveProfile = profile_id => {
    localStorage.setItem('profile_id', JSON.stringify(profile_id));
};
const clearProfile = () => {
    localStorage.removeItem('profile_id');
};

const loadHelpdeskApiKey = () => {
    const helpdesk_api_key = localStorage.getItem('helpdesk_api_key');
    return helpdesk_api_key === null ? null : helpdesk_api_key.replace(/['"]+/g, '');
};
const saveHelpdeskApiKey = helpdesk_api_key => {
    helpdesk_api_key && localStorage.setItem('helpdesk_api_key', JSON.stringify(helpdesk_api_key));
};
const clearHelpdeskApiKey = () => {
    localStorage.removeItem('helpdesk_api_key');
};

const isUserAuthenticated = () => {
    return !!loadApiKey();
};

const authInitialState = {
    isAuthenticated: isUserAuthenticated(),
    is_active_profile: loadIsActiveProfile(),
    profile_id: loadProfile(),
    user_info: loadUserInfo(),
    helpdesk_api_key: loadHelpdeskApiKey()
};

const authReducer = createReducer(authInitialState, {
    [actiontypes.LOGIN_SUCCESS](state, action) {
        const { access_token, is_active_profile, user_info, profile_id, api_key: helpdesk_api_key } = action.data;

        saveApiKey(access_token);
        saveUserInfo(user_info);
        saveIsActiveProfile(is_active_profile);
        saveProfile(profile_id);
        saveHelpdeskApiKey(helpdesk_api_key);

        return {
            ...state,
            isAuthenticated: true,
            is_active_profile,
            profile_id,
            user_info,
            helpdesk_api_key
        };
    },
    [actiontypes.LOGOUT](state, action) {
        clearApiKey();
        clearUserInfo();
        clearIsActiveProfile();
        clearProfile();
        clearHelpdeskApiKey();
        return {
            ...state,
            isAuthenticated: false,
            is_active_profile: false,
            profile_id: null,
            user_info: null,
            helpdesk_api_key: null
        };
    }
});

export default authReducer;