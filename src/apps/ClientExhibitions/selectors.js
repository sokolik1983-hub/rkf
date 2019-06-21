import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'

export const getExhibitions = (state) => state[defaultReduxKey].exhibitions;
export const getExhibitionId = (state, props) => props.exhibitionId;

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
        exhibitionId: id
    }
};

export const getExhibitionsDetails = (state) => state[defaultReduxKey].exhibitionsDetails;

export const getExhibitionsDetailsById = createSelector(
    [getRouteParams, getExhibitionsDetails],
    (routeParams, ExhibitionDetails) => {
        return {
            ...routeParams,
            exhibitionsDetails: ExhibitionDetails[routeParams.exhibitionId]
        }
    }
);


export const getDaysList = state => ({listDays: state[defaultReduxKey].listDays});

export const getExhibitionsIdList = state => ({exhibitionIdList: state[defaultReduxKey].exhibitionIdList})
