import {createSelector} from 'reselect'
import {defaultReduxKey} from 'apps/ExhibitionSchedule/config'

export const selectScheduleDateProps = (state, props) => ({
    dateListIds: state[defaultReduxKey].dateListIds,
    date: state[defaultReduxKey].dates[props.dateId.toString()]
});


export const getExhibitionId = (state, props) => props.match !== undefined ?
    {exhibitionId: props.match.params.id}
    :
    {exhibitionId: null};

export const getDatesIds = state => ({dateIds: state[defaultReduxKey].dateIds});

const selectEvents = state => {
    return state[defaultReduxKey].events
};

export const getScheduleEvents = createSelector(
    [selectEvents],
    (scheduleEvents) => (scheduleEvents)
);

export const getEventId = (state, props) => props.eventId;

export const getEventById = createSelector(
    [selectEvents, getEventId],
    (scheduleEvents, eventId) => {
        return {event: scheduleEvents[eventId]}
    }
);


