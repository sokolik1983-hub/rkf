
import React from "react";
import { getHeaders } from "utils/request";

const AdditionalDocumentField = ({
    setShowModal,
    setUrl,
    documents,
    setDocumentsOverflow,
    id,
    name,
    accept,
    editable,
    formRenderProps
}) => {
    const headers = getHeaders();

    const getDocument = (docId) => {
        if (isNaN(docId) || !docId) return;
        fetch(`/api/requests/exhibition_request/clubexhibitionrequestdocument?id=` + docId, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    const handleClick = (id) => {
        setShowModal(true);
        getDocument(id);
    }

    const handleRemove = () => {
        if (window.confirm('Удалить документ?')) {
            const updatedDocuments = [...documents.filter(d => d.id !== id)];
            formRenderProps.onChange('documents', { value: updatedDocuments });
            if (updatedDocuments.length <= 10) {
                setDocumentsOverflow(false);
            }
        }
    }

    return (<div className="AdditionalDocumentField">
        <div className="AdditionalDocumentField__name">
            <div onClick={() => handleClick(id)}>
                <span className="AdditionalDocumentField__name-icon" />
                {name}
            </div>
        </div>
        {
            !accept && editable && <div className="AdditionalDocumentField__remove">
                <span onClick={() => handleRemove()} className="k-icon k-i-trash" />
            </div>
        }
    </div>)
}

export default AdditionalDocumentField;