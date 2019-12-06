import * as actionTypes from './actionTypes';
import createReducer from "../../utils/createReducer";

const initialState = {
    isOpenFilters: false
};

const layoutReducer = createReducer(initialState, {
    [actionTypes.SET_SHOW_FILTERS](state, action) {
        return {...state, ...action.data};
    },
});

export default layoutReducer;