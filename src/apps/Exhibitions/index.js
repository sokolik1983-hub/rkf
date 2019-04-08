import React, {Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";
import FilterDate from './components/FilterDate'
import List from './containers/ExhibitionsList'
import Paginator from 'components/Paginator'
import {
    fetchExhibitions
} from './actions'


class ExhibitionsProxy extends Component {

    componentDidMount() {
        this.props.fetchExhibitions();
    }

    render() {
        return (
            <div className="exhibitions__holder">
                <FilterDate/>
                <List/>
                <Paginator>
                    <button className="paginator__btn paginator__btn--active">1</button>
                    <button className="paginator__btn">2</button>
                    <button className="paginator__btn">3</button>
                    <button className="paginator__btn paginator__btn--next">Далее</button>
                </Paginator>
            </div>
        );
    }
}


const withReducer = injectReducer({key: 'exhibitions', reducer: reducer});
const withSaga = injectSaga({key: 'exhibitions', saga});


const mapDispatchToProps = dispatch => bindActionCreators({
    fetchExhibitions,
}, dispatch);

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(
    withReducer,
    withSaga,
    withConnect)(ExhibitionsProxy)