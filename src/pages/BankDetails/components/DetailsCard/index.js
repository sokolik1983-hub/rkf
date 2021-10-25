import React from 'react';
import Card from '../../../../components/Card';
import { Link } from "react-router-dom";
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

    return (
        <Card className="details-card">
            <div className={`details-card__icon ${iconClassName}`} />
            <h3 className="details-card__title">{title}</h3>
            <p className={`details-card__text ${fedName === 'РКФ' ? `_RKF` : ``}`}>
                {description}
                {isUserCard && <span style={{ display: 'inline-block' }}>Для просмотра реквизитов выберите одну из необходимых Федераций.</span>}
            </p>
            {!isUserCard && documents?.map((document, i) => <Link
                key={i}
                to={`/details-viewer/${document.document_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="details-card__link"
                style={{ marginRight: '20px' }}
            >
                {document.document_type_id === 1 ? `Реквизиты` : `Размеры взносов в ${fedName}`}
            </Link>)
            }
            {isUserCard && <span className="details-card__user-link">
                {docList?.map((doc, i) => <Link
                    key={i}
                    to={`/details-viewer/${setPdfId(doc.documents, 1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    {doc.organization_type === 6 ? 'Реквизиты Фауна' : doc.organization_type === 7 ? 'Реквизиты Элита' : 'Реквизиты РКК'}
                </Link>)}
                {docList && <Link
                    to={`/details-viewer/${setPdfId(docList[0].documents, 2) || setPdfId(docList[1].documents, 2) || setPdfId(docList[2].documents, 2)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    Размеры взносов в ОАНКОО
                </Link>}
            </span>}
        </Card>
    );
}

export default React.memo(DetailsCard);
