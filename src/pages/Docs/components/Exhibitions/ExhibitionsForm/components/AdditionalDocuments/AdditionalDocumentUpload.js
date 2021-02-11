
import React, { useState } from "react";
import { Field } from "@progress/kendo-react-form";
import FormUpload from "../FormUpload";
import { getHeaders } from "utils/request";

const AdditionalDocumentUpload = ({ documents, setDocuments, documentsOverflow, setDocumentsOverflow, setDisableSubmit, formRenderProps }) => {

    const onBeforeUpload = (e) => {
        e.headers = getHeaders(true);
        setDisableSubmit(true);
        //e.additionalData = { document_type_id: documentType };
    };

    const onStatusChange = (event, name) => {
        if (event.response?.response) {
            const { result } = event.response.response;
            setDocuments([...documents, result]);
            formRenderProps.onChange(name, { value: [] });
            setDisableSubmit(false);
        }
        if ((documents?.length + event.newState.length) > 9) {
            setDocumentsOverflow(true);
        }
    };

    return (<div className="AdditionalDocumentUpload">
        <Field
            id="documents"
            name="documents"
            fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
            component={FormUpload}
            saveUrl={'/api/requests/exhibition_request/clubexhibitionrequestdocument'}
            saveField="file"
            multiple={false}
            onBeforeUpload={e => onBeforeUpload(e)}
            onStatusChange={(e) => onStatusChange(e, 'documents')}
            disabled={documentsOverflow}
            autoUpload={true}
            showFileList={false}
        />
    </div>)
}

export default AdditionalDocumentUpload;