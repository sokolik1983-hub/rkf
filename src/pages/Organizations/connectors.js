import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setFilters} from "./actions";
import {selectFilters} from "./selectors";

export const connectFilters = connect(
    selectFilters,
    dispatch => bindActionCreators({setFilters}, dispatch)
);