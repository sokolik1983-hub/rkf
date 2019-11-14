import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer';

const reportsInitialState = {
    reportsList: [],
    reportHeader: {}
};

const ReportsReducer = createReducer(reportsInitialState, {
    [actiontypes.GET_REPORTS_SUCCESS](state, action) {
        return {
            ...state,
            reportsList: action.data
        };
    },
    [actiontypes.GET_REPORT_HEADER_SUCCESS](state, action) {
        return {
            ...state,
            reportHeader: action.data
        };
    },
});

export default ReportsReducer;
