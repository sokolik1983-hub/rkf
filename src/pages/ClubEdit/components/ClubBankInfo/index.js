import React from 'react';
import {compose} from 'redux';
import reducer from './reducer';
import {connectBankInfo} from './connectors';
import UpdateBankInfoForm from './components/Form';
import {endpointUrl, defaultReduxKey} from './config';
import injectReducer from '../../../../utils/injectReducer';
import {useResourceAndStoreToRedux} from '../../../../shared/hooks';

import './style.scss'


const ClientBankInfoProxy = ({
        bank_data_id,
        getBankInfoSuccess,
        bindSubmitForm,
}) => {

    const url = `${endpointUrl}/${bank_data_id}`;
    useResourceAndStoreToRedux(url, getBankInfoSuccess);

    return (
        !bank_data_id
            ? <div>Не задан идентификатор</div>
            : <div className="BankInfo__wrap">
                <h3>Банковская информация</h3>
                <UpdateBankInfoForm
                    bindSubmitForm={bindSubmitForm}
                />
            </div>
    )
};

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withReducer, connectBankInfo)(React.memo(ClientBankInfoProxy));