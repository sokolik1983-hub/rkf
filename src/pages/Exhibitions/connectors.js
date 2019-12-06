import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setFiltersSuccess} from './actions';
import {selectFilters} from './selectors';

export const connectFilters = connect(
    selectFilters,
    dispatch => bindActionCreators({setFiltersSuccess}, dispatch)
);