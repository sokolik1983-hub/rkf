import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import ClientExhibitionDocumentList from './components/List';
import {defaultReduxKey} from './config';
import injectReducer from '../../utils/injectReducer';
import {ExhibitionIdContext} from './context';
import reducer from './reducer';

function ExhibitionDocumentsProxy({ exhibitionId }) {

    return (
        <ExhibitionIdContext.Provider value={{ exhibitionId }}>
            <ClientExhibitionDocumentList />
        </ExhibitionIdContext.Provider>
    );
}

const withReducer = injectReducer({ key: defaultReduxKey, reducer: reducer });
export default compose(
    withReducer,
    withRouter
)(ExhibitionDocumentsProxy);
