import React, {PureComponent} from "react";
import {compose} from "redux";

import Registration from './components/Registration'

import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";

class RegistrationProxy extends PureComponent {

    render() {
        return (
            <Registration/>
        )
    }
}


const withReducer = injectReducer({key: 'registration', reducer: reducer});
const withSaga = injectSaga({key: 'registration', saga});


export default compose(
    withReducer,
    withSaga,
)(RegistrationProxy)