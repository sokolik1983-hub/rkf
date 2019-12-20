import { defaultReduxKey } from './config';

export const getAuthenticationState = state => state[defaultReduxKey];

export const selectProfileId = state => ({
    profile_id: state[defaultReduxKey].profile_id
});

export const selectIsAuthenticated = state => {
    const { isAuthenticated, profile_id } = getAuthenticationState(state);
    return { isAuthenticated, profile_id };
};

export const selectCreateArticleForm = state => {
    const { isAuthenticated, profile_id } = getAuthenticationState(state);
    const clubId = state.home_page.club.common.id;

    return { isAuthenticated, profile_id, clubId };
};

export const selectWidgetLogin = state => {
    const { isAuthenticated, user_info } = getAuthenticationState(state);
    if (isAuthenticated) {
        const { club_alias, club_name, id, logo_link } = user_info;
        return { isAuthenticated, club_alias, club_name, id, logo_link };
    }

    return { isAuthenticated };
};

