import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";

import {
    fetchDemo
} from 'apps/Demo/actions'



class DemoApp extends Component {

    componentDidMount() {
        this.props.fetchDemo();
    }

    render() {
        return (
            <div className="demo__holder">
                <h1>Demo App</h1>
                <p>Here comes demo</p>
            </div>
        );
    }
}




const withReducer = injectReducer({key: 'demo', reducer: reducer});
const withSaga = injectSaga({key: 'demo', saga});

const mapStateToProps = state => state.demo;

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchDemo,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(DemoApp)