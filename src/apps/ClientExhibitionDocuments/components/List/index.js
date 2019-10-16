import React, { useContext } from 'react';
import ListDocument from './ListItem';
import { ExhibitionIdContext } from 'apps/ClientExhibitionDocuments/context';
import { connectExhibitionDocumentsList } from 'apps/ClientExhibitionDocuments/connectors';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { API_ENDPOINT } from 'apps/ClientExhibitionDocuments/config';
import './styles.scss';

function ExhibitionDocumentList({
    listIds,
    getExhibitionDocumentsListSuccess,
    editable
}) {
    const { exhibitionId } = useContext(ExhibitionIdContext);
    const url = `${API_ENDPOINT}/${String(exhibitionId)}`;
    const { loading } = useResourceAndStoreToRedux(
        url,
        getExhibitionDocumentsListSuccess
    );
    return (
        <>
            <h3 className="text-upper">Ссылки на документы</h3>
            {loading
                ? 'Загрузка...'
                : listIds.map(id => (
                      <ListDocument editable={editable} key={id} id={id} />
                  ))
            }
        </>
    );
}

export default connectExhibitionDocumentsList(ExhibitionDocumentList);
