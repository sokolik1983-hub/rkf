import React from 'react';
import {compose} from 'redux';
import reducer from './reducer';
import {connectLegalInfo} from './connectors';
import UpdateLegalInfoForm from './components/Form';
import {endpointUrl, defaultReduxKey} from './config';
import injectReducer from '../../../../utils/injectReducer';
import {useResourceAndStoreToRedux} from '../../../../shared/hooks';

import './style.scss'


const ClientLegalInfoProxy = ({
        legal_information_id,
        getLegalInfoSuccess,
        bindSubmitForm,
}) => {

    const url = `${endpointUrl}/${legal_information_id}`;
    useResourceAndStoreToRedux(url, getLegalInfoSuccess);

    return (
        !legal_information_id
            ? <div>Не задан идентификатор</div>
            : <div className="LegalInfo__wrap">
                <h3>Юридическая информация</h3>
                <UpdateLegalInfoForm
                    bindSubmitForm={bindSubmitForm}
                />
            </div>
    )
};

const withReducer = injectReducer({key: defaultReduxKey, reducer: reducer});

export default compose(withReducer, connectLegalInfo)(React.memo(ClientLegalInfoProxy));