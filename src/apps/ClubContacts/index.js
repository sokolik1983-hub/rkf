import React from 'react';
import { compose } from 'redux';
import SimpleLoader from 'components/Loaders/Simple';
import ClientContactList from './components/List';
import { CONTACT_TYPES, defaultReduxKey, getlistUrl } from './config';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { connectContactsProxy } from './connectors';

const Row = ({ children }) => (
    <div style={{ alignItems: 'flex-start' }} className="flex-row">
        {children}
    </div>
);

function ClientClubContactsProxy({ getClubContactsListSuccess, club_id }) {
    const url = getlistUrl + String(club_id);
    const { loading } = useResourceAndStoreToRedux(
        url,
        getClubContactsListSuccess
    );
    return loading ? (
        <SimpleLoader />
    ) : (
        <Row>
            <div style={{ marginRight: 8 }} className="flex-col">
                <ClientContactList contactType={CONTACT_TYPES.email} />
            </div>
            <div className="flex-col">
                <ClientContactList contactType={CONTACT_TYPES.phone} />
            </div>
        </Row>
    );
}

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });
export default compose(
    withReducer,
    connectContactsProxy
)(ClientClubContactsProxy);
