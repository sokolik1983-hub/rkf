import React, {memo, useEffect, useState} from "react";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";
import AdditionalDocumentField from "./AdditionalDocumentField";
import Modal from "../../../../../../../components/Modal";
import Loading from "../../../../../../../components/Loading";
import "./styles.scss";


const AdditionalDocuments = ({documents, docTypes, formRenderProps, setDisableSubmit, handleError, editable, status, dataType}) => {
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if(documents && documents.length >= 10) setDocumentsOverflow(true);
    }, [documents])

    return (
        <div style={{marginTop: '20px'}}>
            {(!status || (status && !!documents.length)) &&
                <div className="application-form__additional-title">
                    {editable ? 'Загрузите дополнительный документ' : 'Дополнительные документы'}
                </div>
            }
            <div className="AdditionalDocumentField__wrap">
                {documents && documents.map(document =>
                    <AdditionalDocumentField
                        key={'doc-' + document.document_id}
                        {...document}
                        documents={documents}
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
                        documents={documents}
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