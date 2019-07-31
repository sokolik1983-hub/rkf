import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getContestEvents, getDatesIds, getExhibitionId, getItemById, selectContestDateProps} from './selectors'

import {getContest, updateDateSuccess} from './actions'


export const connectContestDate = connect(selectContestDateProps,
    dispatch => bindActionCreators({updateDateSuccess}, dispatch));


export const connectContestDateList = connect(
    getDatesIds,
);

export const connectContestEvent = connect(
    getItemById,
);

export const connectContestEventsList = connect(
    getContestEvents,
);

export const connectClientExhibitionContestProxy = connect(
    getExhibitionId,
    dispatch => bindActionCreators({
        getContest,
    }, dispatch),
)