import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card';
import { Link } from "react-router-dom";
import { Request } from "../../../../utils/request";

import './index.scss';

const setPdfId = (array, docTypeNeeded) => {
    //doc_type === 1 реквизиты
    //doc_type === 2 взносы
    if (docTypeNeeded === 1) {
        return array.filter(i => i.document_type_id === 1).reduce((a, b) => ({ ...a, ...b }))?.document_id;
    } else if (docTypeNeeded === 2) {
        return array.filter(i => i.document_type_id === 2).reduce((a, b) => ({ ...a, ...b }))?.document_id;
    }
};

const DetailsCard = ({ iconClassName, title, description, documents, isUserCard, docList, fedName }) => {
    const [linkFeesId, setLinkFeesId] = useState('');
    const [linkFedDetails, setLinkFedDetails] = useState('');
    useEffect(() => {
        console.log("linkFeesId", linkFeesId)
        console.log("linkFedDetails", linkFedDetails)
        console.log("documents[0]", documents[0])
        console.log("documents[1]", documents[1])
    })

    useEffect(() => {

        if (documents[0]) {
            (() => Request({
                url: `/api/document/document/public?id=${documents[0].document_id}`
            }, data => {
                setLinkFeesId(data);
            }, error => {
                console.log(error.response);
                // history.replace('/404');
            }))();
        }

        if (documents[1]) {
            (() => Request({
                url: `/api/document/document/public?id=${documents[1].document_id}`
            }, data => {
                setLinkFedDetails(data);
            }, error => {
                console.log(error.response);
                // history.replace('/404');
            }))();
        }
    }, [documents]);
    return (
        <Card className="details-card">
            <div className={`details-card__icon ${iconClassName}`} />
            <h3 className="details-card__title">{title}</h3>
            <p className={`details-card__text ${fedName === 'РКФ' ? `_RKF` : ``}`}>
                {description}
                {isUserCard && <span style={{ display: 'inline-block' }}>Для просмотра реквизитов выберите одну из необходимых Федераций.</span>}
            </p>
            {!isUserCard && documents?.map((document, i) => <a
                key={i}
                href={linkFedDetails}
                target="_blank"
                rel="noopener noreferrer"
                className="details-card__link"
                style={{ marginRight: '20px' }}
            >
                {document.document_type_id === 1 ? `Реквизиты` : `Размеры взносов в ${fedName}`}
            </a>)
            }
            {isUserCard && <span className="details-card__user-link">
                {docList?.map((doc, i) => <a
                    key={i}
                    href={linkFedDetails}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    {doc.organization_type === 6 ? 'Реквизиты Фауна' : doc.organization_type === 7 ? 'Реквизиты Элита' : 'Реквизиты РКК'}
                </a>)}
                {docList && <a
                    href={linkFedDetails}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    Размеры взносов в ОАНКОО
                </a>}
            </span>}
        </Card>
    );
}

export default React.memo(DetailsCard);