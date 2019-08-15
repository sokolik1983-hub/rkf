import React, {PureComponent} from "react"
import {compose} from "redux";
import Card from 'components/Card'
import PublicClubNewsList from './components/NewsList'
import {defaultReduxKey} from "./config";
import reducer from "./reducer";
import injectReducer from "../../utils/injectReducer";

class PublicClubNewsProxy extends PureComponent {

    render() {
        return (
            <Card style={{margin: '52px 0'}}>
                <h4>Новости</h4>
                <PublicClubNewsList/>
            </Card>
        );
    }
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
)(PublicClubNewsProxy)