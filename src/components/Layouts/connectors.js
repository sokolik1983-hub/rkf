import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setShowFilters} from "./action";
import {selectIsOpenFilters} from "./selectors";

export const connectShowFilters = connect(
    selectIsOpenFilters,
    dispatch => bindActionCreators({setShowFilters}, dispatch)
);