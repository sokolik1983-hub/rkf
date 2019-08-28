import React from "react"
import {compose} from 'redux'
import {Route, Switch} from 'react-router-dom'
import ClientClubLayout from './components/Layout'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {defaultReduxKey, endpointUrl} from "./config";
import {connectClientClub} from './connectors'
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import ClubEditPage from './components/CommonEditPage'

function ClientClubProxy(props) {

    const {getClubSuccess, match} = props;
    const {path} = match;
    const {loading} = useResourceAndStoreToRedux(endpointUrl, getClubSuccess);
    return (
        <ClubEditPage/>
        // <Switch>
        //     {loading ? 'загрузка' : null}
        //     <Route exact path={path} component={ClientClubLayout}/>
        //     <Route exact path={`${path}/club`} component={
        //         ClubEditPage
        //     }/>
        // </Switch>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
    connectClientClub,
)(ClientClubProxy)