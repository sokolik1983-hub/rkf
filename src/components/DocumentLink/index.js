import React, { useState, useEffect } from 'react';
import { SvgIcon } from '@progress/kendo-react-common';
import { filePdf } from '@progress/kendo-svg-icons';
import moment from 'moment';
import { getHeaders } from '../../utils/request';

import './index.scss';

const DocumentLink = ({
                          docId,
                          document,
                          endpoint,
                          CardNewsNew,
                          NewsFeedItem
                        }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState(null);
    const [newTab, setNewTab] = useState(null);

    useEffect(() => {
        if (url) newTab.location.href = url;
    }, [url]);

    const getDocument = (docId) => {
        if (!+docId) return;

        fetch(`${endpoint}?id=${docId}`, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setUrl(url);
            });
    };

    const startDocumentLoad = (docId) => {
        getDocument(docId);
        setNewTab(window.open('' , '_blank'));
    }

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

    return (
        !url ?
        <span className={(CardNewsNew || NewsFeedItem) ? "document-item__href" : "btn"}
              onClick={() => docId && startDocumentLoad(docId)}
        >
            {
                (CardNewsNew || NewsFeedItem) ? renderDocumentItem() : "Посмотреть"
            }
        </span> :

        <a className={(CardNewsNew || NewsFeedItem) ? "document-item__href" : "btn"}
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