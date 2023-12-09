
import React, { useState } from "react";
import { Field } from "@progress/kendo-react-form";
import FormUpload from "../FormUpload";
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { getHeaders } from "utils/request";

const AdditionalDocumentUpload = ({ documents, setDocuments, docTypes, documentsOverflow, setDocumentsOverflow, formRenderProps, setDisableSubmit }) => {
    const [documentType, setDocumentType] = useState(0);

    const onBeforeUpload = (e) => {
        e.headers = getHeaders(true);
        e.additionalData = { document_type_id: documentType };
    };

    const onStatusChange = (event, name) => {
        if (event.response?.response) {
            const { result } = event.response.response;
            const uploadedDocument = { document_id: result.id, document_type_id: documentType }
            setDocuments([...documents, uploadedDocument]);
            formRenderProps.onChange(name, { value: [] });
            setDisableSubmit(false);
        }
        if ((documents?.length + event.newState.length) > 9) {
            setDocumentsOverflow(true);
        }
    };

    return (<div className="AdditionalDocumentUpload">
        <DropDownList
            data={docTypes}
            dataItemKey="id"
            textField="name_rus"
            onChange={({ value }) => setDocumentType(value.id)}
            defaultItem={{ name_rus: "Выберите тип", id: 0 }}
            disabled={documentsOverflow}
        />
        <Field
            id="documents"
            name="documents"
            fileFormats={['.pdf', '.jpg', '.jpeg']}
            component={FormUpload}
            saveUrl="/api/requests/membership_confirmation_request/membershipconfirmationdocument"
            saveField="document"
            multiple={false}
            onBeforeUpload={e => onBeforeUpload(e)}
            onStatusChange={(e) => onStatusChange(e, 'documents')}
            disabled={(documentType === 0 || documentsOverflow)}
            autoUpload={true}
            showFileList={false}
        />
    </div>)
}

export default AdditionalDocumentUpload;