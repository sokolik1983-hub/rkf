import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    fetchExhibitionsSuccess,
    getDetails,
} from './actions'

import {
    selectExhibitionDetails,
    selectExhibitions,
    selectExhibitionsListItem,
    selectListExhibitionsByDates,
    selectCalendar
} from './selectors'

export const connectExhibitionsList = connect(
    selectExhibitions,
    dispatch => bindActionCreators({
        fetchExhibitionsSuccess,
    }, dispatch)
);

export const connectExhibitionsListItem = connect(
    selectExhibitionsListItem,
);

export const connectListExhibitionsByDates = connect(
    selectListExhibitionsByDates,
    dispatch => bindActionCreators({
        fetchExhibitionsSuccess,
    }, dispatch)
);

export const connectExhibitionDetails = connect(
    selectExhibitionDetails,
    dispatch => bindActionCreators({
        getDetails,
    }, dispatch)
);


export const connectExhibitionCalendar = connect(
    selectCalendar,
    dispatch => bindActionCreators({
        getDetails,
    }, dispatch)
);