
import React from "react";
import { Field } from "@progress/kendo-react-form";
import FormUpload from "../FormUpload";
import { getHeaders } from "utils/request";

const AdditionalDocumentUpload = ({ documents, documentsOverflow, setDocumentsOverflow, setDisableSubmit, formRenderProps, handleError }) => {

    const onBeforeUpload = (e) => {
        e.headers = getHeaders(true);
        setDisableSubmit(true);
    };

    const onStatusChange = (event, name) => {
        if (event.response?.response) {
            const { result } = event.response.response;
            if (result) {
                formRenderProps.onChange('documents', { value: [...documents, { name: result.name, document_id: result.id }] });
                formRenderProps.onChange(name, { value: [] });
                setDisableSubmit(false);
            } else {
                handleError(event.response);
                formRenderProps.onChange(name, { value: [] });
            }
        }
        if ((documents?.length + event.newState.length) > 9) {
            setDocumentsOverflow(true);
        }
    };

    return (<div className="AdditionalDocumentUpload">
        <Field
            id="documents_upload"
            name="documents_upload"
            fileFormats={['.pdf', '.jpg', '.jpeg']}
            component={FormUpload}
            saveUrl="/api/requests/exhibition_request/clubexhibitionrequestdocument"
            saveField="file"
            multiple={false}
            onBeforeUpload={e => onBeforeUpload(e)}
            onStatusChange={(e) => onStatusChange(e, 'documents_upload')}
            disabled={documentsOverflow}
            autoUpload={true}
            showFileList={false}
        />
    </div>)
}

export default AdditionalDocumentUpload;