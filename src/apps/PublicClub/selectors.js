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

export const selectClubDocuments = state => {
    const {documents} = getState(state);
    console.log(getState(state))
    return {
        documents,
    }
};

export const selectPublicClubAddress=state=>{
    const {documents} = getState(state);
    console.log(getState(state))
    return {
        documents,
    }
}

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
    const {profile_id: club_id} = selectProfileId(state);
    return {
        club_id
    }
};