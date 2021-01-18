import React from 'react';
import Card from '../../../../components/Card';
import { Link } from "react-router-dom";
import './index.scss';


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
                    to={`/details-viewer/${doc.documents[0]?.document_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    {<span>{doc.organization_type === 6 ? 'Реквизиты Фауна' : doc.organization_type === 7 ? 'Реквизиты Элита' : 'Реквизиты РКК'}</span>}
                </Link>)}
                <Link
                    to={`/details-viewer/${docList[0].documents[1].document_id || docList[1].documents[1].document_id || docList[2].documents[1].document_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    {<span>Размеры взносов в ОАНКО</span>}
                </Link>
            </span>}
        </Card>
    );
}

export default React.memo(DetailsCard);