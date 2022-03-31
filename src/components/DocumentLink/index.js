import React, { useState, useEffect } from 'react';
import { getHeaders } from '../../utils/request';
import { SvgIcon } from '@progress/kendo-react-common';
import { filePdf } from '@progress/kendo-svg-icons';
import moment from 'moment';

import './index.scss';

const DocumentLink = ({ docId, document, endpoint, CardNewsNew, NewsFeedItem }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState(null);

    const getDocument = (docId) => {
        if (!+docId) return;

        fetch(`${endpoint}?id=${docId}`, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                   setUrl(url);
            });
    };

    const renderDocumentItem = () => {
        return (
            <>
                <SvgIcon icon={filePdf} size="default" />
                <div className="document-item__name">
                    {document.name}
                    <span className="document-item__date">
                        {`Добавлено 
                            ${moment(document.date_create).format("D MMMM YYYY")} в 
                            ${moment(document.date_create).format("HH:mm")}`
                        }
                    </span>
                </div>
            </>
        )
    };

    useEffect(() => {
        docId && getDocument(docId);
    }, []);

    return (
        <a
            className={(CardNewsNew || NewsFeedItem) ? "document-item__href" : "btn"}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            {
                (CardNewsNew || NewsFeedItem) ? renderDocumentItem() : "Посмотреть"
            }
        </a>
    );
};

export default React.memo(DocumentLink);