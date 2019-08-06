import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'
import {objectNotEmpty} from "../../utils";

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

export const getExhibitionsDetailsImages = createSelector(
    [getRouteParams, getExhibitionsDetails],
    (routeParams, exhibitionDetails) => {
        const {exhibitionId} = routeParams;
        const details = exhibitionDetails[exhibitionId];
        if (objectNotEmpty(details)) {
            const {exhibition_map_link, exhibition_avatar_link} = details;
            return {
                exhibition_map_link,
                exhibition_avatar_link,
                exhibitionId
            }
        }
        return {
            exhibition_map_link: null,
            exhibition_avatar_link: null,
            exhibitionId
        }
    }
);


export const getDaysList = state => ({listDays: state[defaultReduxKey].listDays});

export const getExhibitionsIdList = state => ({exhibitionIdList: state[defaultReduxKey].exhibitionIdList})
