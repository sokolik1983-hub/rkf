import * as actiontypes from './actiontypes';
import createReducer from "utils/createReducer";


const clientInitialState = {
    club_info: {},
};

const clientCommonReducer = createReducer(clientInitialState, {
    [actiontypes.GET_CLUB_INFO_SUCCESS](state, action) {
        return {
            ...state,
            club_info: action.data
        };
    },
});

export default clientCommonReducer;