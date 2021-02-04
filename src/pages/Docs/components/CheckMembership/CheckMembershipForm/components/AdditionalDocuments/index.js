import React, { useEffect, useState } from "react";
import { Form, FormElement } from "@progress/kendo-react-form";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";
import AdditionalDocumentField from "./AdditionalDocumentField";
import { Request } from "utils/request";
import "./styles.scss";


const AdditionalDocuments = ({ id, attachedDocuments, history, clubAlias, docTypes, handleError }) => {
    const [documents, setDocuments] = useState([]);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [formProps, setFormProps] = useState(null);
    const [documentsOverflow, setDocumentsOverflow] = useState(false);

    useEffect(() => {
        setDocuments(attachedDocuments);
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
            url: '/api/requests/membership_confirmation_request/membershipconfirmationrequest',
            method: 'PUT',
            data: JSON.stringify(data)
        }, () => {
            history.push(`/${clubAlias}/documents`);
        }, error => {
            handleError(error);
            setDisableSubmit(false);
        });
    };



    return <div style={{ marginTop: '20px' }}>
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
                    />)
                }
                <Form
                    onSubmit={handleSubmit}
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
                                    onClick={formRenderProps.onSubmit}
                                    disabled={disableSubmit}
                                >Отправить</button>
                            </div>
                        </>)
                    }}
                />
            </div>
        </div>
    </div>
}
export default React.memo(AdditionalDocuments);