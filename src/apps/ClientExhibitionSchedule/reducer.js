import * as actiontypes from './actiontypes';
import {normalizeSchedule} from './normalize'

const clientExhibitionScheduleStateInitialState = {
    loadingApi: false,
    days: {},
    items: {},
    dayIdList: [],
};

export default function clientExhibitionScheduleReducer(state = clientExhibitionScheduleStateInitialState, action) {

    switch (action.type) {
        case actiontypes.GET_SCHEDULE: {
            return {
                ...state,
                loading: true,
            };
        }
        case actiontypes.GET_SCHEDULE_SUCCESS: {
            //TODO Remove this shit
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

        }
        case actiontypes.DAY_ADD: {
            return {
                ...state,
                loading: true,
            };
        }
        case actiontypes.DAY_ADD_SUCCESS: {
            const {data} = action;
            const {days, dayIdList} = {...state};
            //TODO Убрать items:[]
            console.log('days, dayIdList', days, dayIdList)
            days[data.id.toString()] = {...data, items: []};
            return {
                ...state,
                loading: false,
                days: days,
                dayIdList: [...dayIdList, data.id]
            };
        }
        case actiontypes.DAY_ITEM_ADD: {
            return {
                ...state,
                loading: true,
            };
        }
        case actiontypes.DAY_ITEM_ADD_SUCCESS: {
            console.log(action)
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
        }

        default:
            return state;
    }
}
