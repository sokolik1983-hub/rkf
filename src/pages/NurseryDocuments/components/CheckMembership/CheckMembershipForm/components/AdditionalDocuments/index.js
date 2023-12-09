import React, { useEffect, useState } from "react";
import { Form, FormElement } from "@progress/kendo-react-form";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";
import AdditionalDocumentField from "./AdditionalDocumentField";
import { Request } from "utils/request";
import Modal from "components/Modal";
import Loading from "components/Loading";
import "./styles.scss";


const AdditionalDocuments = ({ id, attachedDocuments, history, alias, docTypes, handleError }) => {
    const [documents, setDocuments] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [formProps, setFormProps] = useState(null);
    const [documentsOverflow, setDocumentsOverflow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        setDocuments(attachedDocuments);
        attachedDocuments?.length >= 10 && setDocumentsOverflow(true);
    }, [attachedDocuments])

    const handleSubmit = async () => {
        setDisableSubmit(true);
        const data = {
            id: id,
            documents: documents.map(d => ({
                id: d.id ? d.id : null,
                document_id: d.document_id,
                document_type_id: d.document_type_id
            }))
        };

        await Request({
            url: '/api/requests/membership_confirmation_request/kennelmembershipconfirmationrequest',
            method: 'PUT',
            data: JSON.stringify(data)
        }, () => {
            history.push(`/kennel/${alias}/documents/responsible`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };



    return !docTypes.length
        ? <Loading centered={false} />
        : <div style={{ marginTop: '20px' }}>
            <div className="application-form__additional-title">Загрузите дополнительный документ</div>
            <div className="application-form__row">
                <div>
                    {
                        documents && documents.map(d => <AdditionalDocumentField
                            {...d}
                            key={d.document_id}
                            docTypes={docTypes}
                            documents={documents}
                            setDocuments={setDocuments}
                            setDocumentsOverflow={setDocumentsOverflow}
                            setDisableSubmit={setDisableSubmit}
                            setShowModal={setShowModal}
                            setUrl={setUrl}
                        />)
                    }
                    <Form
                        initialValues={{
                            id: id,
                            documents: attachedDocuments
                        }}
                        render={formRenderProps => {
                            if (!formProps) setFormProps(formRenderProps);
                            return (<>
                                <FormElement>
                                    <AdditionalDocumentUpload
                                        documents={documents}
                                        setDocuments={setDocuments}
                                        docTypes={docTypes}
                                        documentsOverflow={documentsOverflow}
                                        setDocumentsOverflow={setDocumentsOverflow}
                                        formRenderProps={formProps}
                                        setDisableSubmit={setDisableSubmit}
                                    />
                                </FormElement>
                                <div className="application-form__controls">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        disabled={disableSubmit}
                                    >Отправить</button>
                                </div>
                            </>)
                        }}
                    />
                </div>
                <Modal showModal={showModal} handleClose={() => { setShowModal(false); setUrl('') }}>
                    {url ?
                        <embed src={url} className="DocumentLinksArray__embed" /> :
                        <Loading />
                    }
                </Modal>
            </div>
        </div>
}
export default React.memo(AdditionalDocuments);