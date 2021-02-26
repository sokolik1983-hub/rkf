import React, {memo} from "react";
import {getHeaders} from "../../../../../../../utils/request";


const AdditionalDocumentField = ({
    setShowModal,
    setUrl,
    documents,
    setDocumentsOverflow,
    id,
    document_id,
    name,
    accept,
    editable,
    formRenderProps
}) => {
    const getDocument = docId => {
        if (isNaN(docId) || !docId) return;

        const headers = getHeaders();

        fetch(`/api/requests/exhibition_request/clubexhibitionrequestdocument?id=${docId}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    const handleClick = () => {
        setShowModal(true);
        getDocument(document_id);
    };

    const handleRemove = () => {
        if (window.confirm('Удалить документ?')) {
            const updatedDocuments = [...documents.filter(d => d.id !== id)];
            formRenderProps.onChange('documents', { value: updatedDocuments });
            if (updatedDocuments.length <= 10) {
                setDocumentsOverflow(false);
            }
        }
    };

    return (
        <div className="AdditionalDocumentField">
            <div className="AdditionalDocumentField__name">
                <div onClick={() => handleClick()}>
                    <span className="AdditionalDocumentField__name-icon" />
                    {name}
                </div>
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