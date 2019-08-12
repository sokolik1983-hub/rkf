import {defaultReduxKey} from "./config";

import {selectProfileId} from 'apps/Auth/selectors'

export const getClientState = state => {
    return state[defaultReduxKey];
};

export const selectClientData = state => {
    const {profile_id} = selectProfileId(state);
    const client_common = getClientState(state);
    return {
        ...client_common,
        profile_id,
    }
};

export const selectClubInfo = state => ({
    ...state[defaultReduxKey].club_info
});

export const selectClubDescription = state => {
    const {description} = selectClubInfo(state);
    return {
        description
    }
};

export const selectClubHead = state => {
    const {description, avatar_link, name} = selectClubInfo(state);
    return {
        description,
        avatar_link,
        name
    }
};