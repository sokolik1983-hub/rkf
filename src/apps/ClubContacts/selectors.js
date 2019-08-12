import {defaultReduxKey} from "./config";
import {selectProfileId} from 'apps/Auth/selectors'

export const selectListContact = state => {
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


export const selectClubContact = (state, props) => {
    const {listCollection} = selectListContact(state);
    return {
        ...listCollection[String(props.id)]
    }
};