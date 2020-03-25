import { connect } from 'react-redux';
import { getNewsSuccess } from './actions';
import { bindActionCreators } from "redux";
import { selectCities } from './selectors';


export const connectNewsList = connect(
    selectCities,
    dispatch => bindActionCreators(
        {
            getNewsSuccess
        }, dispatch)
);