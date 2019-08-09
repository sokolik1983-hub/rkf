import {defaultReduxKey} from "./config";

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