import React from "react"
import {compose} from "redux";
import {useResourceAndStoreToRedux} from 'shared/hooks'
import UpdateBankInfoForm from './components/Form'

import {connectBankInfo} from './connectors'
import {endpointUrl, defaultReduxKey} from "./config";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";

function ClientBankInfoProxy({bank_data_id, getBankInfoSuccess}) {
    const url = `${endpointUrl}/${bank_data_id}`;
    if(!bank_data_id){
        return (
            <div>Не задан идентификатор</div>
        )
    }
    const {loading} = useResourceAndStoreToRedux(url, getBankInfoSuccess);

    return (
        <div>
            <h3>Банковская информация</h3>
            <UpdateBankInfoForm/>

        </div>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
    connectBankInfo,
)(ClientBankInfoProxy)