import { defaultReduxKey } from './config'

const getState = state => state[defaultReduxKey];
const getClubId = state => state.client_common;
const getClub = state => state.home_page;

export const selectNewsList = (state) => {
    const { listIds } = getState(state);
    const clubId = getClubId(state);
    return {
        clubId,
        listIds
    }
};

export const selectArticleCreateForm = (state) => {
    const { club } = getClub(state);
    const { logo_link } = club.common;
    return {
        clubLogo: logo_link
    }
};

export const selectNewsListPublic = (state, props) => {
    const { listIds } = getState(state);
    const { alias } = props.match.params;
    return {
        alias,
        listIds
    }
};

export const selectListArticle = (state, props) => {
    const { listCollection } = getState(state);
    return {
        ...listCollection[String(props.id)]
    }
};
