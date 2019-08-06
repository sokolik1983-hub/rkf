import React, {PureComponent} from "react"
import {compose} from "redux";
import Card from 'components/Card'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";
import ListCreateView from './components/ListCreate'

function ClientExhibitionDocumentsProxy() {

    return (
        <Card style={{margin: '52px 0'}}>
            <h4>docs</h4>
            <ListCreateView/>
        </Card>
    );

}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,
)(ClientExhibitionDocumentsProxy)