import * as actiontypes from './actiontypes';
import {normalizeSchedule} from './normalize'
import createReducer from 'utils/createReducer'

const clientExhibitionScheduleStateInitialState = {
    loadingApi: false,
    days: {},
    items: {},
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
        if (action.data.length) {
            const {entities, result} = normalizeSchedule(action.data);
            const {days, items} = entities;
            return {
                ...state,
                loading: false,
                days,
                items: items || {},
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
        const {days, dateIds} = {...state};
        //TODO Убрать items:[]
        days[data.id.toString()] = {...data, items: []};
        return {
            ...state,
            loading: false,
            days: days,
            dateIds: [...dateIds, data.id]
        };
    },
    [actiontypes.DATE_UPDATE_SUCCESS](state, action) {
        //TODO добавить пресортировку
        const {id, data} = action;
        const {days} = {...state};
        const day = days[id.toString()];
        days[id.toString()] = {...day, ...data};
        return {
            ...state,
            loading: false,
            days: days,
        };
    },

    [actiontypes.EVENT_ADD_SUCCESS](state, action) {
        const {day_id, ...data} = action.data;
        const {days, items} = {...state};
        const day = {...days[day_id.toString()]};
        day.items = [...day.items, data.id];
        items[data.id.toString()] = data;
        days[day_id.toString()] = day;
        return {
            ...state,
            loading: false,
            days,
            items
        };
    },
    [actiontypes.EVENT_UPDATE_SUCCESS](state, action) {
        const {id} = action.data;
        const items = {...state.items};
        items[id.toString()] = action.data;
        return {
            ...state,
            loading: false,
            items,
        };
    },
    [actiontypes.EVENT_DELETE_SUCCESS](state, action) {
        const {id, day} = action;
        const items = {...state.items};
        const {days} = state;
        delete items[id.toString()];
        const dayObj = {...days[day.toString()]};
        dayObj.items = dayObj.items.filter(itemId => itemId !== id);
        days[day.toString()]={...dayObj};
        return {
            ...state,
            loading: false,
            days,
            items,
        };
    },
});

export default clientExhibitionScheduleReducer;