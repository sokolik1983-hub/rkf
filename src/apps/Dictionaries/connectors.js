import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getDict} from "./actions";

const getDictFromState = (state, props) => ({dict: state.dictionaries[props.dictName]});

export const connectDictionary = connect(
    getDictFromState,
    dispatch => bindActionCreators(
        {
            getDict
        }, dispatch)
);