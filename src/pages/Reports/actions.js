import * as actionTypes from './actiontypes';
import { makeActionCreator } from 'utils/index';

export const fetchReportsSuccess = makeActionCreator(
    actionTypes.GET_REPORTS_SUCCESS,
    'data'
);

export const fetchReportHeaderSuccess = makeActionCreator(
    actionTypes.GET_REPORT_HEADER_SUCCESS,
    'data'
);