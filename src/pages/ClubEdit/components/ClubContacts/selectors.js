import { defaultReduxKey } from './config';
import {selectIsAuthenticated} from "../../../Login/selectors";

const getState = state => state[defaultReduxKey];

export const selectContactsList = state => {
    const { profile_id: club_id } = selectIsAuthenticated(state);

    const { listIds, contactsPhoneIds, contactsEmailIds } = getState(state);
    return {
        listIds,
        contactsPhoneIds,
        contactsEmailIds,
        club_id
    };
};

export const selectClubId = state => {
    const { profile_id: club_id } = selectIsAuthenticated(state);
    return {
        club_id
    };
};

export const selectClubContact = (state, props) => {
    const { listCollection } = getState(state);
    return {
        clubContact: listCollection[String(props.id)]
    };
};
