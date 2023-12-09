import React from 'react';
import Card from '../../../../components/Card';

const DeletePage = () => {
    return (
        <Card>
            <div className="nursery-page__delete">
                <h3>Удаление страницы</h3>
                <p>
                    Удаление Профиля Питомника недоступно
                </p>
                <button className="button-delete__disable" disabled="disabled">
                    Удалить
                </button>
            </div>
        </Card>
    );
};

export default DeletePage;


