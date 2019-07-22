import React, {PureComponent} from "react"
import ClientProfile from './components/Profile'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import {compose} from "redux";

class ClientProfileProxy extends PureComponent {

    render() {
        //const {path} = this.props.match;
        return (
            <ClientProfile/>
        );
    }
}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,
)(ClientProfileProxy)