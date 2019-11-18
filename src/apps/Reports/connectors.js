import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchReportsSuccess,
    fetchReportHeaderSuccess
} from './actions';

import {
    selectReports,
    selectReportHeader
} from './selectors';

export const connectReportsList = connect(
    selectReports,
    dispatch => bindActionCreators({fetchReportsSuccess}, dispatch)
);

export const connectReportHeader = connect(
    selectReportHeader,
    dispatch => bindActionCreators({fetchReportHeaderSuccess}, dispatch)
);