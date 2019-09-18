import { getIdFromRouterParams } from 'utils/index';

import { defaultReduxKey } from './config';

const getClubId = state => ({
    clubId: state.authentication.profile_id
});
export const getState = state => state[defaultReduxKey];

const selectExhibitionsDetailsById = (state, id) =>
    state[defaultReduxKey].exhibitionsDetails.hasOwnProperty(String(id))
        ? state[defaultReduxKey].exhibitionsDetails[String(id)]
        : null;
export const selectExhibitions = state => {
    const { listIds, listCollection } = getState(state);
    return {
        listIds,
        listCollection
    };
};

export const selectExhibitionsPaginator = state => {
    const { page_count, page_prev, page_next, page_current } = getState(state);
    return {
        page_count,
        page_prev,
        page_next,
        page_current
    };
};

export const selectExhibitionsListItem = (state, props) => {
    const { listCollection } = getState(state);
    const { clubId } = getClubId(state);
    return {
        clubId,
        ...listCollection[String(props.id)]
    };
};

export const selectExhibitionDetails = (state, props) => {
    const exhibitionId = getIdFromRouterParams(props);
    return {
        exhibitionId,
        details: selectExhibitionsDetailsById(state, exhibitionId)
    };
};

export const selectListExhibitionsByDates = state => {
    const { dates } = getState(state);
    return { dates };
};

export const selectCalendar = state => {
    const { dates } = getState(state);
    const calendarModifiers = dates.map(date => new Date(date));
    return { calendarModifiers };
};

export const selectCalendar__deprecated = state => {
    const { dates } = getState(state);
    const calendarModifiers = dates.map(
        date => new Date(date.year, parseInt(date.month - 1, 10), date.day)
    );
    return { calendarModifiers };
};

export const selectExhibitionsFilter = state => {
    const { breeds, castes, cities, dates, ranks, types } = getState(state);

    return {
        filterOptionsBreeds: breeds,
        filterOptionsCastes: castes,
        filterOptionsCities: cities,
        filterOptionsDates: dates,
        filterOptionsRanks: ranks,
        filterOptionsTypes: types
    };
};

export const selectExhibitionsSearch = state => {
    const { city_ids } = getState(state);

    return {
        city_ids
    };
};

export const selectExhibitionPrices = state => {
    const { exhibitionPrices } = getState(state);
    return {
        exhibitionPrices
    };
};
