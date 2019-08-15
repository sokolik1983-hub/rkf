import {defaultReduxKey} from "./config";
import {selectProfileId} from 'apps/Auth/selectors'

export const selectListSocial = state => {
    const {profile_id: club_id} = selectProfileId(state);

    const {
        listIds,
        listCollection,
    } = state[defaultReduxKey];
    return {
        listIds,
        listCollection,
        club_id,
    }
};

export const selectClubId = state => {
    const {profile_id: club_id} = selectProfileId(state);
    return {
        club_id
    }
};


export const selectClubSocial = (state, props) => {
    const {listCollection} = selectListSocial(state);
    return {
        clubSocial: listCollection[String(props.id)]
    }
};