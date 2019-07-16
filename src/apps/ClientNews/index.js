import React, {PureComponent} from "react"
import {compose} from "redux";
import Card from 'components/Card'
import ClientNewsList from 'apps/ClientNews/components/NewsList'
import {createDefaultInjectors} from "utils/createInjectors";
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import saga from "./saga";

class ClientNewsProxy extends PureComponent {

    render() {
        return (
            <Card style={{margin:'52px 0'}}>
                <h4>Новости</h4>
                <ClientNewsList/>
            </Card>
        );
    }
}

const {withReducer, withSaga} = createDefaultInjectors({defaultReduxKey, reducer, saga});
export default compose(
    withReducer,
    withSaga,

)(ClientNewsProxy)