import React, { useContext } from 'react';
import ListDocument from './ListDocument';
import { ExhibitionIdContext } from 'apps/ExhibitionDocuments/context';
import { connectExhibitionDocumentsList } from 'apps/ExhibitionDocuments/connectors';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { API_ENDPOINT } from 'apps/ExhibitionDocuments/config';

import './styles.scss';

function ExhibitionDocumentList({
    listIds,
    getExhibitionDocumentsListSuccess
}) {
    const { exhibitionId } = useContext(ExhibitionIdContext);
    const url = `${API_ENDPOINT}/${String(exhibitionId)}`;
    const { loading } = useResourceAndStoreToRedux(
        url,
        getExhibitionDocumentsListSuccess
    );
    return (
        <div className="ExhibitionDocumentList">
            {loading
                ? 'Загрузка...'
                : listIds.map(id => <ListDocument key={id} id={id} />)}
        </div>
    );
}

export default connectExhibitionDocumentsList(ExhibitionDocumentList);
