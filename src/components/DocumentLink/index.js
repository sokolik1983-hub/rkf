import React, { useState, useEffect } from 'react';
import { getHeaders } from '../../utils/request';
import { SvgIcon } from '@progress/kendo-react-common';
import { filePdf } from '@progress/kendo-svg-icons';
import moment from 'moment';

import './index.scss';

const DocumentLink = ({ docId, document, documents, endpoint, page, CardNewsNew, NewsFeedItem }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState(null);

    console.log('page', page);
    console.log('endpoint', documents);

    const getDocument = (docId) => {
        if (!+docId) return;

        fetch(`${endpoint}?id=${docId}`, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                console.log('url', url);
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
        if(documents?.length > 0) {
            documents.map(d => getDocument(d.id));
        } else {
            getDocument(docId);
        }

    }, []);

    return (
        <>
            {
                documents?.length > 0 &&
                documents.map(d => {
                    return <a
                                className="btn"
                                href={url}
                                target="_blank"
                            >
                                Посмотреть
                            </a>
                })
            }
            {
                (CardNewsNew || NewsFeedItem)
                    ?

                    <a
                        className="document-item__href"
                        href={url}
                        target="_blank"
                    >
                        {renderDocumentItem()}
                    </a>
                    :
                    <a
                    className="btn"
                    href={url}
                    target="_blank"
                    >
                        Посмотреть
                    </a>

            }
        </>
    );
};

export default React.memo(DocumentLink);