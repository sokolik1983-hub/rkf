import React from "react"
import {compose} from "redux";
import {useResourceAndStoreToRedux} from 'shared/hooks'
import UpdateBankInfoForm from './components/Form'

import {connectBankInfo} from './connectors'
import {endpointUrl, defaultReduxKey} from "./config";
import injectReducer from "utils/injectReducer";
import reducer from "./reducer";

function ClientBankInfoProxy({legal_information_id, getBankInfoSuccess}) {
    const url = `${endpointUrl}?id=${legal_information_id}`;
    if(!legal_information_id){
        return (
            <div>Не задан идентификатор</div>
        )
    }
    const {loading} = useResourceAndStoreToRedux(url, getBankInfoSuccess);

    return (
        <div>
            <h3>Юридическая информация</h3>
            <UpdateBankInfoForm/>

        </div>
    )
}

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});
export default compose(
    withReducer,
    connectBankInfo,
)(ClientBankInfoProxy)