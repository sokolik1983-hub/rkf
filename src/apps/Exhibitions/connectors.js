import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchExhibitionsSuccess,
    fetchFiltersSuccess,
    fetchSearchSuccess,
    fetchDatesSuccess,
    getDetailsSuccess,
    storePrices
} from './actions';

import {
    selectExhibitionDetails,
    selectExhibitions,
    selectExhibitionsPaginator,
    selectExhibitionsListItem,
    selectListExhibitionsByDates,
    selectCalendar,
    selectExhibitionsFilter,
    selectExhibitionPrices,
    selectClubId
} from './selectors';

export const connectExhibitionsList = connect(
    selectExhibitions,
    dispatch =>
        bindActionCreators(
            {
                fetchExhibitionsSuccess
            },
            dispatch
        )
);

export const connectExhibitionsFilter = connect(
    selectExhibitionsFilter,
    dispatch =>
        bindActionCreators(
            {
                fetchExhibitionsSuccess,
                fetchFiltersSuccess
            },
            dispatch
        )
);

export const connectExhibitionsListItem = connect(selectExhibitionsListItem);

export const connectExhibitionsSearch = connect(
    selectExhibitions,
    dispatch =>
        bindActionCreators(
            {
                fetchSearchSuccess,
                fetchExhibitionsSuccess
            },
            dispatch
        )
);

export const connectListExhibitionsByDates = connect(
    selectListExhibitionsByDates,
    dispatch =>
        bindActionCreators(
            {
                fetchExhibitionsSuccess
            },
            dispatch
        )
);

export const connectExhibitionDetails = connect(
    selectExhibitionDetails,
    dispatch =>
        bindActionCreators(
            {
                getDetailsSuccess
            },
            dispatch
        )
);

export const connectExhibitionCalendar = connect(
    selectCalendar,
    dispatch => bindActionCreators({ fetchDatesSuccess }, dispatch)
);

export const connectExhibitionPrices = connect(
    selectExhibitionPrices,
    dispatch =>
        bindActionCreators(
            {
                storePrices
            },
            dispatch
        )
);

export const connectClubId = connect(
    selectClubId,
);

export const connectExhibitionsPaginator = connect(selectExhibitionsPaginator);
