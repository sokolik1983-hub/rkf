import {defaultReduxKey} from "./config";
import {selectIsAuthenticated} from "../../../Login/selectors";

export const selectListDocument = state => {
    const {profile_id: club_id} = selectIsAuthenticated(state);

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
    const {profile_id: club_id} = selectIsAuthenticated(state);
    return {
        club_id
    }
};


export const selectClubDocument = (state, props) => {
    const {listCollection} = selectListDocument(state);
    return {
        clubDocument: listCollection[String(props.id)]
    }
};