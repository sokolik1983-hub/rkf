import React from 'react';
import {compose} from 'redux';
import reducer from './reducer';
import {connectContactsProxy} from './connectors';
import ClientContactList from './components/List';
import Loading from '../../../../components/Loading';
import UpdateClubInfoForm from '../ClubInfo/components/Form';
import injectReducer from '../../../../utils/injectReducer';
import {CONTACT_TYPES, defaultReduxKey, getlistUrl} from './config';
import {useResourceAndStoreToRedux} from '../../../../shared/hooks';

import './style.scss'


const ClientClubContactsProxy = ({
        club_id,
        bindSubmitClubInfo,
        bindSubmitClubEmail,
        bindSubmitClubPhone,
        getClubContactsListSuccess,
}) => {
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubContactsListSuccess);


    return loading ?
        <Loading /> :
        <div className="contacts__wrap">
            <div className="contacts__address">
                <UpdateClubInfoForm
                    bindSubmitForm={bindSubmitClubInfo}
                />
            </div>
            <div className="contacts__phone">
                <ClientContactList
                    contactType={CONTACT_TYPES.phone}
                    bindSubmitForm={bindSubmitClubPhone}
                />
            </div>
            <div className="contacts__email">
                <ClientContactList
                    contactType={CONTACT_TYPES.email}
                    bindSubmitForm={bindSubmitClubEmail}
                />
            </div>
        </div>
};

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(withReducer, connectContactsProxy)(React.memo(ClientClubContactsProxy));