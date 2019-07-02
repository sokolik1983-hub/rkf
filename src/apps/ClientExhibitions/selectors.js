import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'

export const getExhibitions = (state) => state[defaultReduxKey].exhibitions;
export const getExhibitionId = (state, props) => props.exhibitionId;

export const getExhibitionDetailsFor = (state, props) => {
    const exhibitionId = props.match.params.id;
    return {exhibitionDetails: state[defaultReduxKey].exhibitionsDetails[exhibitionId]}
};

export const getExhibitionById = createSelector(
    [getExhibitions, getExhibitionId],
    (exhibitions, exhibitionId) => {
        return {...exhibitions[exhibitionId]}
    }
);


export const getRouteParams = (state, props) => {
    const {path, url, params} = props.match;
    const {id} = params;
    return {
        path,
        url,
        exhibitionId: params.id
    }
};

export const getExhibitionsDetails = (state) => state[defaultReduxKey].exhibitionsDetails;

export const getExhibitionsDetailsById = createSelector(
    [getRouteParams, getExhibitionsDetails],
    (routeParams, exhibitionDetails) => {
        return {
            ...routeParams,
            exhibitionsDetails: exhibitionDetails[routeParams.exhibitionId]
        }
    }
);


export const getDaysList = state => ({listDays: state[defaultReduxKey].listDays});

export const getExhibitionsIdList = state => ({exhibitionIdList: state[defaultReduxKey].exhibitionIdList})
