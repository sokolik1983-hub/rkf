import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import RegistrationLayout from './components/Layout'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";

import {
    registerUser
} from 'apps/Registration/actions'



class Registration extends Component {

    render() {
        return <RegistrationLayout/>
    }
}




const withReducer = injectReducer({key: 'registration', reducer: reducer});
const withSaga = injectSaga({key: 'registration', saga});

const mapStateToProps = state => state.registration;

const mapDispatchToProps = dispatch => bindActionCreators({
    registerUser,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(Registration)