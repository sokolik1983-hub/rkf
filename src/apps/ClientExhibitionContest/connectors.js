import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    getDatesIds,
    getContestEvents,
    getItemById,
    getExhibitionId,
    selectContestDateProps
} from './selectors'

import {
    addContestEventSuccess,
    addDateSuccess,
    deleteContestEvent,
    updateContestEventSuccess,
    getContest,
    updateDateSuccess
} from './actions'


export const connectContestDate = connect(selectContestDateProps,
    dispatch => bindActionCreators({updateDateSuccess}, dispatch));


export const connectContestDateList = connect(
    getDatesIds,
    dispatch => bindActionCreators({
        addDateSuccess
    }, dispatch)
);

export const connectContestEditableEvent = connect(
    getItemById,
    dispatch => bindActionCreators(
        {
            addContestEventSuccess,
            updateContestEventSuccess,
            deleteContestEvent,
        }, dispatch)
);

export const connectContestEventsList = connect(
    getContestEvents,
    dispatch => bindActionCreators(
        {
            addContestEventSuccess,
            updateContestEventSuccess,
            deleteContestEvent,
        }, dispatch)
);

export const connectClientExhibitionContestProxy = connect(
    getExhibitionId,
    dispatch => bindActionCreators({
        getContest,
    }, dispatch),
)