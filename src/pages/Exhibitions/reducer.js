import * as actiontypes from './actiontypes';
import createReducer from "../../utils/createReducer";
import {getInitialFilters, setFiltersToLS} from "./utils";

const initialFilters = getInitialFilters();

const filtersReducer = createReducer(initialFilters, {
    [actiontypes.SET_FILTERS_SUCCESS](state, action) {
        const filters = {...state, ...action.data};
        setFiltersToLS(filters);
        return filters;
    },
});

export default filtersReducer;