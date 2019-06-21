import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ClientExhibitionSchedule/config'


const selectItems = state => state[defaultReduxKey].items;

export const getDayItems = createSelector(
    [selectItems],
    (dayItems) => ({dayItems: dayItems})
);

export const getItemId = (state, props) => props.itemId;

export const getItemById = createSelector(
    [getDayItems, getItemId],
    (dayItems, itemId) => {
        return {item: dayItems.dayItems[itemId]}
    }
);


