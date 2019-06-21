import * as actiontypes from './actiontypes';
import {normalizeSchedule} from './normalize'
import createReducer from 'utils/createReducer'

const clientExhibitionScheduleStateInitialState = {
    loadingApi: false,
    days: {},
    items: {},
    dayIdList: [],
};

const clientExhibitionScheduleReducer = createReducer(clientExhibitionScheduleStateInitialState, {
    [actiontypes.GET_SCHEDULE](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_SCHEDULE_SUCCESS](state, action) {
        console.log('GET_SCHEDULE_SUCCESS')
        if (action.data.length) {
            const {entities, result} = normalizeSchedule(action.data);
            const {days, items} = entities;
            return {
                ...state,
                loading: false,
                days,
                items,
                dayIdList: result,
            };
        }
        return {
            ...state,
            loading: false,
        }
    },
    [actiontypes.DAY_ADD](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.DAY_ADD_SUCCESS](state, action) {
        const {data} = action;
        const {days, dayIdList} = {...state};
        //TODO Убрать items:[]
        days[data.id.toString()] = {...data, items: []};
        return {
            ...state,
            loading: false,
            days: days,
            dayIdList: [...dayIdList, data.id]
        };
    },
    [actiontypes.DAY_ITEM_ADD](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.DAY_ITEM_ADD_SUCCESS](state, action) {
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
});

export default clientExhibitionScheduleReducer;