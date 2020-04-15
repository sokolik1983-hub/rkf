import React, { useState } from 'react';
import Card from "components/Card";
import history from 'utils/history';
import './styles.scss';

const HomepageCheckStatus = () => {
    const [barcode, setBarcode] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/rkf/document-status/${barcode}`);
    };

    return <Card>
        <h3 style={{ fontSize: '22px' }}>Отслеживание статуса изготовления документов</h3>
        <form onSubmit={handleSubmit} className="HomepageCheckStatus">
            <input
                type="text"
                pattern="[0-9]{13}"
                onChange={({ target }) => setBarcode(target.value)}
                title="Введите 13-значный номер отслеживания"
                placeholder="Введите 13-значный номер отслеживания"
                required
            />
            <button type="submit">Найти</button>
        </form>
    </Card>
};

export default HomepageCheckStatus;