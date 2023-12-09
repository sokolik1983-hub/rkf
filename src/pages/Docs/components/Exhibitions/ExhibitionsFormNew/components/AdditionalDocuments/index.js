import React, { memo, useEffect, useState } from "react";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";
import AdditionalDocumentField from "./AdditionalDocumentField";
import Modal from "../../../../../../../components/Modal";
import Loading from "../../../../../../../components/Loading";
import "./styles.scss";


const AdditionalDocuments = ({ documents, docTypes, formRenderProps, setDisableSubmit, handleError, editable, status, dataType }) => {
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    const typesIds = docTypes ? ((dataType === 'ranksIds' || dataType === 'international') ? [...docTypes].map(type => type.value) : [...docTypes].map(type => type.id)) : [];
    const updatedDocuments = [...documents].filter(doc => typesIds.includes(doc.object_id));

    useEffect(() => {
        if (updatedDocuments && updatedDocuments.length >= 10) setDocumentsOverflow(true);
    }, [updatedDocuments])

    return (
        <div style={{ marginTop: '20px' }}>
            {(!status || (status && !!updatedDocuments.length)) &&
                <div className="application-form__additional-title">
                    {editable ? 'Загрузите дополнительный документ' : 'Дополнительные документы'}
                </div>
            }
            <div className="AdditionalDocumentField__wrap">
                {updatedDocuments && updatedDocuments.map(document =>
                    <AdditionalDocumentField
                        key={'doc-' + document.document_id}
                        {...document}
                        documents={updatedDocuments}
                        setDocumentsOverflow={setDocumentsOverflow}
                        setShowModal={setShowModal}
                        setUrl={setUrl}
                        editable={editable}
                        formRenderProps={formRenderProps}
                    />
                )}
            </div>
            {editable &&
                <div className="application-form__row">
                    <AdditionalDocumentUpload
                        documents={updatedDocuments}
                        docTypes={docTypes}
                        documentsOverflow={documentsOverflow}
                        setDocumentsOverflow={setDocumentsOverflow}
                        setDisableSubmit={setDisableSubmit}
                        formRenderProps={formRenderProps}
                        handleError={handleError}
                        dataType={dataType}
                    />
                </div>
            }
            <Modal
                showModal={showModal}
                handleClose={() => {
                    setUrl('');
                    setShowModal(false);
                }}
            >
                {url ?
                    <embed src={url} className="DocumentLinksArray__embed" /> :
                    <Loading />
                }
            </Modal>
        </div>
    )
};

export default memo(AdditionalDocuments);