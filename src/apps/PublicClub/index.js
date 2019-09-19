import React from "react"
import {compose} from 'redux'
import PublicClubLayout from './components/Layout'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {defaultReduxKey, endpointUrl} from "./config";
import {connectPublicClub} from './connectors'
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import Container from "components/Layout/Container";

function PublicClubProxy({route = 'rkf', getClubSuccess}) {
    const url = `${endpointUrl}?route=${route}`;
    useResourceAndStoreToRedux(url, getClubSuccess);

    return (
        <Container>
            <PublicClubLayout/>
        </Container>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
    connectPublicClub,
)(PublicClubProxy)