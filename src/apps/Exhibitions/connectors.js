import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    fetchExhibitions,
    getDetails,
} from './actions'

import {
    selectExhibitionDetails,
    selectExhibitions,
    selectExhibitionsListItem,
} from './selectors'

export const connectExhibitionsList = connect(
    selectExhibitions,
    dispatch => bindActionCreators({
        fetchExhibitions,
    }, dispatch)
);

export const connectExhibitionsListItem = connect(
    selectExhibitionsListItem,
);
export const connectExhibitionDetails = connect(
    selectExhibitionDetails,
    dispatch => bindActionCreators({
        getDetails,
    }, dispatch)
);