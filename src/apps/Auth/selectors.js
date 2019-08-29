import {defaultReduxKey} from './config'

export const getAuthenticationState = state => (state[defaultReduxKey]);

export const selectProfileId = state => ({profile_id: state[defaultReduxKey].profile_id});

export const selectIsAuthenticated = state => {
    const {isAuthenticated} = getAuthenticationState(state);
    return {isAuthenticated}
}