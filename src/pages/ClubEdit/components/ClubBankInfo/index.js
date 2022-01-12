import React from "react";
import {compose} from "redux";
import UpdateBankInfoForm from "./components/Form";
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";
import {connectBankInfo} from "./connectors";
import {endpointUrl, defaultReduxKey} from "./config";
import injectReducer from "../../../../utils/injectReducer";
import reducer from "./reducer";

import './style.scss'


const ClientBankInfoProxy = ({bank_data_id, getBankInfoSuccess, bindSubmitForm}) => {
    const url = `${endpointUrl}/${bank_data_id}`;

    if(!bank_data_id){
        return (
            <div>Не задан идентификатор</div>
        )
    }

    useResourceAndStoreToRedux(url, getBankInfoSuccess);

    return (
        <div className='BankInfo__wrap'>
            <h3>Банковская информация</h3>
            <UpdateBankInfoForm bindSubmitForm={bindSubmitForm}/>
        </div>
    )
};

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withReducer, connectBankInfo)(React.memo(ClientBankInfoProxy));