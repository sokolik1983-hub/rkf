import React from 'react';
import Card from '../../../../components/Card';
import './index.scss';


const DetailsCard = ({iconClassName, title, description}) => {

    return (
        <Card className="details-card">
            <div className={`details-card__icon ${iconClassName}`} />
            <h3 className="details-card__title">{title}</h3>
            <p>{description}</p>
            <a href>Подробнее...</a>
        </Card>
    );
}

export default React.memo(DetailsCard);