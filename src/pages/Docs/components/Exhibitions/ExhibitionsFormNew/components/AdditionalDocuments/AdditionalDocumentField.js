import React, { memo, useEffect, useState } from 'react';
import {getHeaders} from '../../../../../../../utils/request';


const AdditionalDocumentField = ({
        documents,
        setDocumentsOverflow,
        document_id,
        name,
        accept,
        editable,
        formRenderProps
    }) => {
    const [url, setUrl] = useState('')

    const getDocument = docId => {
        if (isNaN(docId) || !docId) return;

        const headers = getHeaders();
        setUrl('')
        fetch(`/api/requests/exhibition_request/clubexhibitionrequestdocument?id=${docId}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    const handleRemove = () => {
        if (window.confirm('Удалить документ?')) {
            const updatedDocuments = [...documents].filter(d => d.document_id !== document_id);
            formRenderProps.onChange('documents', { value: updatedDocuments });
            if (updatedDocuments.length <= 10) {
                setDocumentsOverflow(false);
            }
        }
    };

    useEffect(()=>{
        getDocument(document_id)
    },[document_id])

    return (
        <div className="AdditionalDocumentField">
            <div className="AdditionalDocumentField__name">
                <a
                    className="AdditionalDocumentField__link"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="AdditionalDocumentField__name-icon" />
                    {name}
                </a>
            </div>
            {!accept && editable &&
                <div className="AdditionalDocumentField__remove">
                    <span onClick={() => handleRemove()} className="k-icon k-i-trash" />
                </div>
            }
        </div>
    )
};

export default memo(AdditionalDocumentField);