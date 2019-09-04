import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    fetchExhibitionsSuccess,
    getDetailsSuccess,
    storePrices
} from './actions'

import {
    selectExhibitionDetails,
    selectExhibitions,
    selectExhibitionsPaginator,
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
    dispatch => bindActionCreators({
        fetchExhibitionsSuccess
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
        getDetailsSuccess,
    }, dispatch)
);


export const connectExhibitionCalendar = connect(
    selectCalendar,
);

export const connectExhibitionPrices = connect(
    selectExhibitionPrices,
    dispatch => bindActionCreators({
        storePrices,
    }, dispatch)
);

export const connectExhibitionsPaginator = connect(
    selectExhibitionsPaginator,
);