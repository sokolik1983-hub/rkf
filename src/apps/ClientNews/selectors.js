import {defaultReduxKey} from './config'

const getClubId = state => {
    const {club_id} = state.client_club;
    return {club_id}
};

const getState = state => state[defaultReduxKey];


export const selectNews = state => {
    const {club_id} = getClubId(state);
    const {listIds, listCollection} = getState(state);
    return {
        club_id,
        listIds,
        listCollection
    }
};

export const selectNewsStory = (state, props) => {
    const {id} = props;
    const {listCollection} = getState(state);
    return {
        newsStory: listCollection.hasOwnProperty(String(id)) ? listCollection[String(id)] : null
    }
};
