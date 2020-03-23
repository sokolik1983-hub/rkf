import React from "react";
import {compose} from "redux";
import Loading from "../../../../components/Loading";
import ClientContactList from "./components/List";
import {CONTACT_TYPES, defaultReduxKey, getlistUrl} from "./config";
import injectReducer from "../../../../utils/injectReducer";
import reducer from "./reducer";
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";
import {connectContactsProxy} from "./connectors";


const ClientClubContactsProxy = ({getClubContactsListSuccess, club_id, bindSubmitClubEmail, bindSubmitClubPhone}) => {
    const url = getlistUrl + String(club_id);
    const {loading} = useResourceAndStoreToRedux(url, getClubContactsListSuccess);

    return loading ?
        <Loading /> :
        <div style={{alignItems: 'flex-start'}} className="flex-row">
            <div style={{marginRight: 8}} className="flex-col">
                <ClientContactList
                    contactType={CONTACT_TYPES.email}
                    bindSubmitForm={bindSubmitClubEmail}
                />
            </div>
            <div className="flex-col">
                <ClientContactList
                    contactType={CONTACT_TYPES.phone}
                    bindSubmitForm={bindSubmitClubPhone}
                />
            </div>
        </div>
};

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });

export default compose(withReducer, connectContactsProxy)(React.memo(ClientClubContactsProxy));