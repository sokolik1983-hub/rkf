import React from 'react';
import Card from 'components/Card';
import './styles.scss';

const AddStamp = ({ history }) => {
    return <Card style={{ margin: 0 }}>
        <div className="club-documents-status__head">
            <button className="btn-backward" onClick={() => history.goBack()}>Назад</button>
        </div>
        <div className="AddStamp">
            AddStamp
        </div>
    </Card>
};

export default AddStamp;