import React, { useState,  useRef } from 'react';
import { getHeaders } from '../../utils/request';
import { SvgIcon } from '@progress/kendo-react-common';
import { filePdf } from '@progress/kendo-svg-icons';
import moment from 'moment';

import './index.scss';

const DocumentLink = ({ docId, document, endpoint, page }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState('');
    const linkRef = useRef();

    console.log('page', page)
    console.log('endpoint', endpoint)

    const getDocument = () => {
        if (!+docId) return;

        fetch(`${endpoint}?id=${docId}`, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => {
                setUrl(url);
                linkRef.current.click();
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
    }


    return (
        !!docId &&
        <>
            { !url ?
                <span
                    className="document-item__href"
                    onClick={ getDocument }
                >
                        {renderDocumentItem()}
                    </span> :
                <a
                    className="document-item__href"
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    ref={ linkRef }
                >
                    {renderDocumentItem()}
                </a> }
        </>

    );
};

export default React.memo(DocumentLink);