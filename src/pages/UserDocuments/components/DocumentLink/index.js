import React, { useState, useEffect } from 'react';
import { getHeaders } from '../../../../utils/request';

import './index.scss';


const DocumentLink = ({ docId }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState('');

    useEffect(() => {
        getDocument();
    }, []);

    const getDocument = () => {
        if (!+docId) return;

        fetch(`/api/requests/dog_health_check_request/doghealthcheckdocument?id=${docId}`, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };


    return (
        <>

            <a
                className='btn nomargin'
                href={url}
                target='_blank'
                rel='noreferrer noopener'
            >Посмотреть11111111111</a>
        </>
    );
};

export default React.memo(DocumentLink);