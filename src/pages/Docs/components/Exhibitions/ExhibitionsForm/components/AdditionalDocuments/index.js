import React, { useEffect, useState } from "react";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";
import AdditionalDocumentField from "./AdditionalDocumentField";
import Modal from "components/Modal";
import Loading from "components/Loading";
import "./styles.scss";


const AdditionalDocuments = ({ id, documents, setDocuments, attachedDocuments, formRenderProps, setDisableSubmit, history, clubAlias, handleError }) => {
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        setDocuments(attachedDocuments ? attachedDocuments : []);
        attachedDocuments?.length >= 10 && setDocumentsOverflow(true);
    }, [attachedDocuments])



    return <div style={{ marginTop: '20px' }}>
        <div className="application-form__additional-title">Загрузите дополнительный документ</div>
        <div className="AdditionalDocumentField__wrap">
            {
                documents && documents.map(d => <AdditionalDocumentField
                    {...d}
                    key={d.id}
                    documents={documents}
                    setDocuments={setDocuments}
                    setDocumentsOverflow={setDocumentsOverflow}
                    setShowModal={setShowModal}
                    setUrl={setUrl}
                />)
            }
        </div>
        <div className="application-form__row">
            <AdditionalDocumentUpload
                documents={documents}
                setDocuments={setDocuments}
                documentsOverflow={documentsOverflow}
                setDocumentsOverflow={setDocumentsOverflow}
                setDisableSubmit={setDisableSubmit}
                formRenderProps={formRenderProps}
            />
        </div>
        <Modal showModal={showModal} handleClose={() => { setShowModal(false); setUrl('') }}>
            {url ?
                <embed src={url} className="DocumentLinksArray__embed" /> :
                <Loading />
            }
        </Modal>
    </div>
}
export default React.memo(AdditionalDocuments);