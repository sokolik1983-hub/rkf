import React, { useEffect, useState } from "react";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";
import AdditionalDocumentField from "./AdditionalDocumentField";
import Modal from "components/Modal";
import Loading from "components/Loading";
import "./styles.scss";


const AdditionalDocuments = ({ id, documents, formRenderProps, setDisableSubmit, history, clubAlias, handleError, editable, status, getDocuments }) => {
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        documents?.length >= 10 && setDocumentsOverflow(true);
    }, [documents])

    return <div style={{ marginTop: '20px' }}>
        {
            editable && <div className="application-form__row">
                <AdditionalDocumentUpload
                    documents={documents}
                    documentsOverflow={documentsOverflow}
                    setDocumentsOverflow={setDocumentsOverflow}
                    setDisableSubmit={setDisableSubmit}
                    formRenderProps={formRenderProps}
                    handleError={handleError}
                    getDocuments={getDocuments}
                />
            </div>
        }
        <Modal showModal={showModal} handleClose={() => { setShowModal(false); setUrl('') }}>
            {/*{url ?*/}
            {/*    <embed src={url} className="DocumentLinksArray__embed" /> :*/}
            {/*    <Loading />*/}
            {/*}*/}
        </Modal>
    </div>
}
export default React.memo(AdditionalDocuments);