import React from "react";
import {compose} from "redux";
import UpdateLegalInfoForm from "./components/Form";
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";
import {connectLegalInfo} from "./connectors";
import {endpointUrl, defaultReduxKey} from "./config";
import injectReducer from "../../../../utils/injectReducer";
import reducer from "./reducer";


const ClientLegalInfoProxy = ({legal_information_id, getLegalInfoSuccess, bindSubmitForm}) => {
    const url = `${endpointUrl}/${legal_information_id}`;

    if(!legal_information_id){
        return (
            <div>Не задан идентификатор</div>
        )
    }

    useResourceAndStoreToRedux(url, getLegalInfoSuccess);

    return (
        <div>
            <h3>Юридическая информация</h3>
            <UpdateLegalInfoForm bindSubmitForm={bindSubmitForm}/>
        </div>
    )
};

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withReducer, connectLegalInfo)(React.memo(ClientLegalInfoProxy));