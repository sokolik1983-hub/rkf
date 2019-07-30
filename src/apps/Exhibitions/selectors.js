import {getIdFromRouterParams} from 'utils/index'

import {defaultReduxKey} from './config'


const selectExhibitionsDetailsById = (state, id) =>
    state[defaultReduxKey].exhibitionsDetails.hasOwnProperty(String(id)) ?
        state[defaultReduxKey].exhibitionsDetails[String(id)]
        :
        null
;

export const selectExhibitions = (state, props) => {
    const {
        exhibitions,
        exhibitionsIds
    } = state[defaultReduxKey];
    return {
        exhibitions,
        exhibitionsIds
    }
};

export const selectExhibitionsListItem = (state, props) => {
    const {
        exhibitions,
    } = state[defaultReduxKey];
    return {
        ...exhibitions[String(props.id)]
    }
};

export const selectExhibitionDetails = (state, props) => {
    const exhibitionId = getIdFromRouterParams(props);
    return {
        exhibitionId,
        details: selectExhibitionsDetailsById(state, exhibitionId)
    }
};