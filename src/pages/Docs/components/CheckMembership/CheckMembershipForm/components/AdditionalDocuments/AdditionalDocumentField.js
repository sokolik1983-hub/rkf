
import React, { useState } from "react";
import { getHeaders } from "utils/request";
import { DropDownList } from '@progress/kendo-react-dropdowns';

const AdditionalDocumentField = ({ setShowModal, setUrl, documents, setDocuments, docTypes, setDocumentsOverflow, setDisableSubmit, document_id, document_type_id, accept }) => {
    const [dropdownValue, setDropdownValue] = useState(docTypes.filter(d => d.id === document_type_id)[0]);
    const headers = getHeaders();

    const getDocument = (docId) => {
        if (isNaN(docId) || !docId) return;
        fetch(`/api/requests/get_rkf_document/getrkfdocumentrequestdocument?id=` + docId, { headers })
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
            const updatedDocuments = [...documents.filter(d => d.document_id !== document_id)];
            setDocuments(updatedDocuments);
            if (updatedDocuments.length <= 10) {
                setDocumentsOverflow(false);
                setDisableSubmit(updatedDocuments.length ? false : true);
            }
        }
    }

    const handleDropDownChange = ({ value }) => {
        const updatedItem = documents[documents.findIndex(d => d.document_id === document_id)];
        updatedItem.document_type_id = value.id;
        setDocuments([
            ...documents.filter(d => d.document_id !== document_id),
            updatedItem
        ]);
        setDropdownValue(docTypes.filter(d => d.id === value.id)[0]);
        setDisableSubmit(false);
    }

    return (<div className="AdditionalDocumentField">
        <DropDownList
            data={docTypes}
            dataItemKey="id"
            textField="name_rus"
            value={dropdownValue}
            onChange={handleDropDownChange}
            disabled={accept}
        />
        <div className="AdditionalDocumentField__name">
            <div onClick={() => handleClick(document_id)}>
                <span className="AdditionalDocumentField__name-icon" />
                {docTypes.filter(d => d.id === document_type_id)[0].name_rus}
            </div>
        </div>
        {
            !accept && <div className="AdditionalDocumentField__remove">
                <span onClick={() => handleRemove()} className="k-icon k-i-trash" />
            </div>
        }
    </div>)
}

export default AdditionalDocumentField;