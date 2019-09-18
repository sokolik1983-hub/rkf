import { defaultReduxKey } from './config';

export const getAuthenticationState = state => state[defaultReduxKey];

export const selectProfileId = state => ({
    profile_id: state[defaultReduxKey].profile_id
});

export const selectIsAuthenticated = state => {
    const { isAuthenticated } = getAuthenticationState(state);
    return { isAuthenticated };
};

export const selectWidgetLogin = state => {
    const { isAuthenticated, user_info } = getAuthenticationState(state);
    if (isAuthenticated) {
        const { club_alias, club_name } = user_info;
        return { isAuthenticated, club_alias, club_name };
    }

    return { isAuthenticated };
};
