import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    fetchExhibitionsSuccess,
    getDetails,
    getDetailsSuccess,
    storePrices
} from './actions'

import {
    selectExhibitionDetails,
    selectExhibitions,
    selectExhibitionsListItem,
    selectListExhibitionsByDates,
    selectCalendar,
    selectExhibitionsFilter,
    selectExhibitionPrices
} from './selectors'

export const connectExhibitionsList = connect(
    selectExhibitions,
    dispatch => bindActionCreators({
        fetchExhibitionsSuccess,
    }, dispatch)
);

export const connectExhibitionsFilter = connect(
    selectExhibitionsFilter,
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
        getDetailsSuccess,
    }, dispatch)
);


export const connectExhibitionCalendar = connect(
    selectCalendar,
    dispatch => bindActionCreators({
        getDetails,
    }, dispatch)
);

export const connectExhibitionPrices = connect(
    selectExhibitionPrices,
    dispatch => bindActionCreators({
        storePrices,
    }, dispatch)
);