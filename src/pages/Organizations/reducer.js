import * as actiontypes from "./actiontypes";
import createReducer from "../../utils/createReducer";
import {getInitialFilters, setFiltersToLS} from "./utils";

const initialFilters = getInitialFilters();

const filtersReducer = createReducer(initialFilters, {
    [actiontypes.SET_FILTERS_SUCCESS](state, action) {
        if(Object.keys(action.data).length === 1 && !Object.keys(action.data).includes('start_element')) {
            action.data.start_element = 1;
        }

        console.log('action.data', action.data);

        const filters = {...state, ...action.data};
        setFiltersToLS({...filters, start_element: 1});
        return filters;
    }
});

export default filtersReducer;