import React from 'react';
import Card from '../../../../components/Card';
import { Link } from "react-router-dom";
import './index.scss';


const DetailsCard = ({ iconClassName, title, description, documentId, isUserCard, docList }) => {

    return (
        <Card className="details-card">
            <div className={`details-card__icon ${iconClassName}`} />
            <h3 className="details-card__title">{title}</h3>
            <p className="details-card__text">
                {description}
                {isUserCard && <span style={{ display: 'inline-block' }}>Для просмотра реквизитов выберите одну из необходимых Федераций.</span>}
            </p>
            {!isUserCard && <Link
                to={`/details-viewer/${documentId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="details-card__link"
            >
                Подробнее...
            </Link>}
            {isUserCard && <span className="details-card__user-link">
                {docList && docList.map((doc, i) => <Link
                    key={i}
                    to={`/details-viewer/${doc.document_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="details-card__link"
                >
                    {doc.organization_type === 6 ? 'Фауна' : doc.organization_type === 7 ? 'Элита' : 'РКК'}
                </Link>)}
            </span>}
        </Card>
    );
}

export default React.memo(DetailsCard);