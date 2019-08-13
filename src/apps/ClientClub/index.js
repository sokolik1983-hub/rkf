import React from "react"
import {compose} from 'redux'
import ClientClubLayout from './components/Layout'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {defaultReduxKey, endpointUrl} from "./config";
import {connectClientClub} from './connectors'
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";

function ClientClubProxy({id, route, getClubSuccess}) {
    const {loading} = useResourceAndStoreToRedux(endpointUrl, getClubSuccess);

    return (
        <ClientClubLayout/>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
    connectClientClub,
)(ClientClubProxy)