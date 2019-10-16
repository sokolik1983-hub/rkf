import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ClientExhibitionSchedule/config'

export const selectScheduleDateProps = (state, props) => ({
    dayListIds: state[defaultReduxKey].dayListIds,
    day: state[defaultReduxKey].days[props.dayId.toString()]
});


export const getExhibitionId = (state, props) => props.match !== undefined ?
    {exhibitionId: props.match.params.id}
    :
    {exhibitionId: null};

export const getDatesIds = state => ({dateIds: state[defaultReduxKey].dateIds});

const selectItems = state => {
    return state[defaultReduxKey].items
};

export const getScheduleEvents = createSelector(
    [selectItems],
    (scheduleEvents) => (scheduleEvents || {})
);

export const getItemId = (state, props) => props.itemId;

export const getItemById = createSelector(
    [selectItems, getItemId],
    (scheduleEvents, itemId) => {
        return {item: scheduleEvents[itemId]}
    }
);


