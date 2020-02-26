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

const isUserAuthenticated = () => {
    return !!loadApiKey();
};

const authInitialState = {
    isAuthenticated: isUserAuthenticated(),
    is_active_profile: loadIsActiveProfile(),
    user_info: loadUserInfo(),
    profile_id: loadProfile()
};

const authReducer = createReducer(authInitialState, {
    [actiontypes.LOGIN_SUCCESS](state, action) {
        const {access_token, is_active_profile, user_info, profile_id} = action.data;

        saveApiKey(access_token);
        saveUserInfo(user_info);
        saveIsActiveProfile(is_active_profile);
        saveProfile(profile_id);

        const {club_alias, club_name} = user_info;

        return {
            ...state,
            club_alias,
            club_name,
            isAuthenticated: true,
            is_active_profile,
            user_info,
            profile_id
        };
    },
    [actiontypes.LOGOUT](state, action) {
        clearApiKey();
        clearUserInfo();
        clearIsActiveProfile();
        clearProfile();
        return {
            ...state,
            isAuthenticated: false,
            user_info: null
        };
    }
});

export default authReducer;