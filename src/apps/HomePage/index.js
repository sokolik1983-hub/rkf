import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import HomePageLayout from 'apps/HomePage/components/Layout'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";

import {
    fetchHomePage
} from 'apps/HomePage/actions'


class HomePageApp extends Component {

    componentDidMount() {
        this.props.fetchHomePage();
    }

    render() {
        return (
            <HomePageLayout/>
        );
    }
}


const withReducer = injectReducer({key: 'home_page', reducer: reducer});
const withSaga = injectSaga({key: 'home_page', saga});

const mapStateToProps = state => state.home_page;

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchHomePage,
}, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(HomePageApp)