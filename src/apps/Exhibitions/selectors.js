import {getIdFromRouterParams} from 'utils/index'

import {defaultReduxKey} from './config'


export const getState = state => state[defaultReduxKey];

const selectExhibitionsDetailsById = (state, id) =>
    state[defaultReduxKey].exhibitionsDetails.hasOwnProperty(String(id)) ?
        state[defaultReduxKey].exhibitionsDetails[String(id)]
        :
        null
;

export const selectExhibitions = (state) => {
    const {listIds, listCollection} = getState(state);
    return {
        listIds, listCollection
    }
};

export const selectExhibitionsListItem = (state, props) => {
    const {listCollection} = getState(state);
    return {
        ...listCollection[String(props.id)]
    }
};

export const selectExhibitionDetails = (state, props) => {
    const exhibitionId = getIdFromRouterParams(props);
    return {
        exhibitionId,
        details: selectExhibitionsDetailsById(state, exhibitionId)
    }
};


export const selectListExhibitionsByDates = state => {
    const {dates} = getState(state);
    return {dates}
};

export const selectCalendar = state => {
    const {dates} = getState(state);
    const calendarModifiers = dates.map(date => new Date(date.year, parseInt(date.month - 1, 10), date.day));
    return {calendarModifiers}
};


export const selectExhibitionsFilter = state => {
    const {
        breed_ids,
        city_ids,
    } = getState(state);

    return {
        breed_ids,
        city_ids,
    }
};

export const selectExhibitionPrices = state => {
    const {exhibitionPrices} = getState(state);
    return {
        exhibitionPrices
    }
};