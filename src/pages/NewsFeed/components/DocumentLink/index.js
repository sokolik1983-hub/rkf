import React, { useState, useEffect } from 'react';
import { getHeaders } from '../../../../utils/request';
import { SvgIcon } from '@progress/kendo-react-common';
import { filePdf } from '@progress/kendo-svg-icons';
import moment from 'moment';


const DocumentLink = ({ docId, document }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState('');

    useEffect(() => {
        getDocument();
    }, []);

    const getDocument = () => {
        if (!+docId) return;

        fetch(`/api/document/publicdocument?id=${docId}`, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };


    return (
        <>
            {!!docId &&
            <a
                className="d-flex align-items-center"
                href={url}
                target="_blank"
                rel="noreferrer noopener"
            >
                <SvgIcon icon={filePdf} size="default" />
                <div className="d-flex flex-column">
                    {document.name}
                    <span className="DocumentItem__date">
                        {`Добавлено ${moment(document.create_date).format("D MMMM YYYY")} в ${moment(document.create_date).format("HH:mm")}`}
                    </span>
                </div>
            </a>
            }
        </>
    );
};

export default React.memo(DocumentLink);