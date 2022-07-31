export const selectIsAuthenticated = state => {
    const {isAuthenticated, profile_id, is_active_profile, user_info, access_token} = state.authentication;
    if (isAuthenticated) {
        const {user_type} = user_info;
        return {isAuthenticated, profile_id, is_active_profile, user_type, access_token};
    }
    return {isAuthenticated, profile_id, is_active_profile};
};

export const selectWidgetLogin = state => {
    const {isAuthenticated, is_active_profile, account_type, user_info} = state.authentication;

    if (isAuthenticated) {
        return {
            isAuthenticated,
            is_active_profile,
            account_type,
            user_info
        };
    }

    return {isAuthenticated};
};

export const selectUserInfo = state => {
    const {isAuthenticated, user_info} = state.authentication;

    if (isAuthenticated) {
        return {
            isAuthenticated,
            user_info
        };
    }

    return {isAuthenticated};
};