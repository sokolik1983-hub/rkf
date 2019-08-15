import {defaultReduxKey} from "./config";
import {selectProfileId} from 'apps/Auth/selectors'

export const getState = state => ({...state[defaultReduxKey]});

export const selectClubHeaderPicture = state => {
    const {headliner_link} = getState(state);
    return {
        backgroundImage: headliner_link,
    }
};

export const selectClubLogoPicture = state => {
    const {logo_link} = getState(state);
    return {
        backgroundImage: logo_link,
    }
};

export const selectClubHeader = state => {
    const {headliner_link, logo_link,  name} = getState(state);
    return {
        headliner_link,
        logo_link,
        name
    }
};

export const selectClubDescription = state => {
    const {description} = getState(state);
    return {
        description,
    }
};

export const selectClubContacts = state => {
    const {contacts} = getState(state);
    return {
        contacts,
    }
};


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

export const selectClubAlias=state=>{
    const {club_id, club_alias} = getState(state);
    return {
        club_id,
        club_alias
    }
};

export const selectLegalInfoId=state=>{
    const {legal_information_id} = getState(state);
    return {
        legal_information_id
    }
};

export const selectBankInfoId=state=>{
    const {bank_data_id} = getState(state);
    return {
        bank_data_id
    }
};

export const selectClubInfo = state => {
    const {
        address,
        city_id,
        club_id,
        correspondence_address,
        description,
        name,
        site,
        status_id,
    } = getState(state);
    return {
        clubInfo: {
            club_id,
            address,
            description,
            city_id,
            site,
            name,
            correspondence_address,
            status_id,
        }
    }
};