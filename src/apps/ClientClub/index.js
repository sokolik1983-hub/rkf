import React from "react"
import { compose } from 'redux'
import { useResourceAndStoreToRedux } from 'shared/hooks'
import { defaultReduxKey, endpointUrl } from "./config";
import { connectClientClub } from './connectors'
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";
import ClubEditPage from './components/CommonEditPage'

function ClientClubProxy(props) {
    const { getClubSuccess } = props;
    useResourceAndStoreToRedux(endpointUrl, getClubSuccess);

    return (
        <ClubEditPage />
    )
}

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });
export default compose(
    withReducer,
    connectClientClub,
)(ClientClubProxy)