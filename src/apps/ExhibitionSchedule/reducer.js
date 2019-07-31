import * as actiontypes from './actiontypes';
import {normalizeSchedule} from './normalize'
import createReducer from 'utils/createReducer'

const clientExhibitionScheduleStateInitialState = {
    loadingApi: false,
    dates: {},
    events: {},
    dateIds: [],
};

const clientExhibitionScheduleReducer = createReducer(clientExhibitionScheduleStateInitialState, {
    [actiontypes.GET_SCHEDULE](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_SCHEDULE_SUCCESS](state, action) {
        //console.log(action)
        if (action.data.length) {
            const {entities, result} = normalizeSchedule(action.data);
            const {dates, events} = entities;
            return {
                ...state,
                loading: false,
                dates,
                events,
                dateIds: result,
            };
        }
        return {
            ...state,
            loading: false,
        }
    },

    [actiontypes.DATE_ADD_SUCCESS](state, action) {
        const {data} = action;
        const {dates, dateIds} = {...state};
        //TODO Убрать events:[]
        dates[data.id.toString()] = {...data, events: []};
        return {
            ...state,
            loading: false,
            dates: dates,
            dateIds: [...dateIds, data.id]
        };
    },
    [actiontypes.DATE_UPDATE_SUCCESS](state, action) {
        //TODO добавить пресортировку
        const {id, data} = action;
        const {dates} = {...state};
        const date = dates[id.toString()];
        dates[id.toString()] = {...date, ...data};
        return {
            ...state,
            loading: false,
            dates: dates,
        };
    },

    [actiontypes.EVENT_ADD_SUCCESS](state, action) {
        const {date_id, ...data} = action.data;
        const {dates, events} = {...state};
        const date = {...dates[date_id.toString()]};
        date.events = [...date.events, data.id];
        events[data.id.toString()] = data;
        dates[date_id.toString()] = date;
        return {
            ...state,
            loading: false,
            dates,
            events
        };
    },
    [actiontypes.EVENT_UPDATE_SUCCESS](state, action) {
        const {id} = action.data;
        const events = {...state.events};
        events[id.toString()] = action.data;
        return {
            ...state,
            loading: false,
            events,
        };
    },
    [actiontypes.EVENT_DELETE_SUCCESS](state, action) {
        const {id, date} = action;
        const events = {...state.events};
        const {dates} = state;
        delete events[id.toString()];
        const dateObj = {...dates[date.toString()]};
        dateObj.events = dateObj.events.filter(eventId => eventId !== id);
        dates[date.toString()]={...dateObj};
        return {
            ...state,
            loading: false,
            dates,
            events,
        };
    },
});

export default clientExhibitionScheduleReducer;