import React from 'react';
import Card from '../../../../components/Card';

const ClubDelete = ({is_federation}) => {

    return (
        <Card className="ClubEdit__delete">
            <h3>Удаление страницы</h3>
            <p>
                Удаление Профиля {is_federation ? "Федерации" : "Клуба" } недоступно
            </p>
            <button
                className="button-delete__disable"
                disabled="disabled"
            >
                Удалить
            </button>
        </Card>
    );
};

export default ClubDelete;

