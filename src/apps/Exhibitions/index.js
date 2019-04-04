import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";
import FilterDate from './components/FilterDate'

import {
    fetchDemo
} from 'apps/Demo/actions'



class DemoApp extends Component {

    componentDidMount() {
        this.props.fetchDemo();
    }

    render() {
        return (
            <div className="exhibitions__holder">
                <FilterDate/>
                <p>Here comes Exhibitions</p>
            </div>
        );
    }
}




const withReducer = injectReducer({key: 'exhibitions', reducer: reducer});
const withSaga = injectSaga({key: 'exhibitions', saga});

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