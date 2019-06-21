import React, {PureComponent} from "react";
import {Switch, Route} from 'react-router-dom'
import {compose} from "redux";
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'

import Registration from './components/Registration'
import ConfirmRegistrationSuccess from './components/ConfirmRegistrationSuccess'
import ConfirmRegistrationFailed from './components/ConfirmRegistrationFailed'
import RegistrationSuccess from './components/SuccessScreen'

import reducer from './reducer'
import saga from "./saga";
import {defaultReduxKey} from './config'
import {RegistrationPathContext} from './context'

class RegistrationProxy extends PureComponent {

    render() {
        const {path} = this.props.match;
        return (
            <RegistrationPathContext.Provider value={{path}}>
                <Switch>
                    <Route exact path={`${path}/confirm/success`} component={ConfirmRegistrationSuccess}/>
                    <Route exact path={`${path}/confirm/failed`} component={ConfirmRegistrationFailed}/>
                    <Route exact path={`${path}/success`} component={RegistrationSuccess}/>
                    <Route path={path} component={Registration}/>
                </Switch>
            </RegistrationPathContext.Provider>
        )
    }
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
const withSaga = injectSaga({key: defaultReduxKey, saga});

export default compose(
    withReducer,
    withSaga,
)(RegistrationProxy)