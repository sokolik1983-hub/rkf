import * as actiontypes from "./actiontypes";
import createReducer from "../../utils/createReducer";
import {getInitialFilters} from "./utils";

const filtersReducer = createReducer(getInitialFilters(), {
    [actiontypes.SET_FILTERS_SUCCESS](state, action) {
        if(Object.keys(action.data).length === 1 && !Object.keys(action.data).includes('start_element')) {
            action.data.start_element = 1;
        }

        return {...state, ...action.data};
    }
});

export default filtersReducer;