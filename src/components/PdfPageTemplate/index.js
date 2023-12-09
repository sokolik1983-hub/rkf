import React from 'react';
import moment from 'moment';

const PdfPageTemplate = ({ title }) => {

    return (
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
            <span style={{ marginLeft: '47px' }}>{title} от </span>
            <span>{moment(new Date()).format(`DD.MM.YYYY`)}</span>
        </div>
    );
};

export default PdfPageTemplate;