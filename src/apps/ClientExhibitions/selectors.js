import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ClientExhibitions/config'

export const getExhibitions = (state) => state[defaultReduxKey].exhibitions;
export const getExhibitionId = (state, props) => props.exhibitionId;

export const getExhibitionById = createSelector(
    [getExhibitions, getExhibitionId],
    (exhibitions, exhibitionId) => {
        return {...exhibitions[exhibitionId]}
    }
)