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
        <h3>Статус документов</h3>
        <form onSubmit={handleSubmit} className="HomepageCheckStatus">
            <input
                type="text"
                pattern="[0-9]{13}"
                onChange={({ target }) => setBarcode(target.value)}
                title="Введите 13-значный номер отслеживания"
                placeholder="введите трек-номер"
                required
            />
            <button type="submit">Поиск</button>
        </form>
    </Card>
};

export default HomepageCheckStatus;