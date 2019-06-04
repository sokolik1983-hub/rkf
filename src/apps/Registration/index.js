import React, {PureComponent} from "react";
import {Switch, Route} from 'react-router-dom'
import {compose} from "redux";

import Registration from './components/Registration'
import ConfirmRegistrationSuccess from './components/ConfirmRegistrationSuccess'
import ConfirmRegistrationFailed from './components/ConfirmRegistrationFailed'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import reducer from './reducer'
import saga from "./saga";
import {RegistrationPathContext} from './context'

class RegistrationProxy extends PureComponent {

    render() {
        //console.log(this.props);
        const {path} = this.props.match;
        return (
            <RegistrationPathContext.Provider value={{path}}>
                <Switch>
                    <Route exact path={`${path}/confirm/success`} component={ConfirmRegistrationSuccess}/>
                    <Route exact path={`${path}/confirm/failed`} component={ConfirmRegistrationFailed}/>
                    <Route path={path} component={Registration}/>
                </Switch>
            </RegistrationPathContext.Provider>
        )
    }
}


const withReducer = injectReducer({key: 'registration', reducer: reducer});
const withSaga = injectSaga({key: 'registration', saga});


export default compose(
    withReducer,
    withSaga,
)(RegistrationProxy)