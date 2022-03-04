export const selectIsAuthenticated = state => {
    const { isAuthenticated, profile_id, is_active_profile, user_info, access_token } = state.authentication;
    if (isAuthenticated) {
        const { user_type } = user_info;
        return { isAuthenticated, profile_id, is_active_profile, user_type, access_token };
    }
    return { isAuthenticated, profile_id, is_active_profile };
};

export const selectWidgetLogin = state => {
    const { isAuthenticated, user_info, is_active_profile } = state.authentication;
    if (isAuthenticated) {
        const { logo_link } = user_info;
        return { isAuthenticated, is_active_profile, logo_link };
    }

    return { isAuthenticated };
};