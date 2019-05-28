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
            //console.log(normalizeSchedule(action.data))
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

        default:
            return state;
    }
}
