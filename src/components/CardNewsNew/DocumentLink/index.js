import React, { useState,  useRef } from 'react';
import { getHeaders } from '../../../utils/request';
import { SvgIcon } from '@progress/kendo-react-common';
import { filePdf } from '@progress/kendo-svg-icons';
import moment from 'moment';


const DocumentLink = ({ docId, document }) => {
    const headers = getHeaders();
    const [url, setUrl] = useState('');
    const linkRef = useRef();

    const getDocument = () => {
        if (!+docId) return;

        fetch(`/api/document/publicdocument?id=${docId}`, { headers })
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
                <img className="DocumentItem__pdf" src="/static/icons/icon-pdf3.svg" alt="pdf"/>
                <div className="DocumentItem__name">
                    {document.name}
                    <span className="DocumentItem__date">
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
                    className="DocumentItem__href card-news-new__documents-item-name"
                    onClick={ getDocument }
                >
                        {renderDocumentItem()}
                    </span> :
                <a
                    className="DocumentItem__href"
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