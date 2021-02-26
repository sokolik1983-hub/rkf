import React, {memo, useState} from "react";
import {Field} from "@progress/kendo-react-form";
import FormUpload from "../FormUpload";
import {getHeaders} from "../../../../../../../utils/request";
import {DropDownList} from "@progress/kendo-react-dropdowns";


const AdditionalDocumentUpload = ({documents, docTypes, documentsOverflow, setDocumentsOverflow, setDisableSubmit, formRenderProps, handleError}) => {
    const [documentType, setDocumentType] = useState(0);

    const onBeforeUpload = e => {
        e.headers = getHeaders(true);
        setDisableSubmit(true);
    };

    const onStatusChange = (event, name) => {
        if (event.response && event.response.response) {
            const {result} = event.response.response;
            if (result) {
                let newDocument = {name: result.name, document_id: result.id};

                if(documentType) newDocument.object_id = documentType;

                formRenderProps.onChange('documents', {value: [...documents, newDocument]});
                formRenderProps.onChange(name, {value: []});
                setDisableSubmit(false);
            } else {
                handleError(event.response);
                formRenderProps.onChange(name, {value: []});
            }
        }

        if (documents && documents.length + event.newState.length > 9) {
            setDocumentsOverflow(true);
        }
    };

    return (
        <div className="AdditionalDocumentUpload">
            {docTypes &&
                <DropDownList
                    data={docTypes}
                    dataItemKey="value"
                    textField="text"
                    onChange={({value}) => setDocumentType(value.value)}
                    defaultItem={{text: "Выберите тип", value: 0}}
                    disabled={documentsOverflow}
                />
            }
            <Field
                id="documents_upload"
                name="documents_upload"
                fileFormats={['.pdf', '.jpg', '.jpeg', '.png']}
                component={FormUpload}
                saveUrl="/api/requests/exhibition_request/clubexhibitionrequestdocument"
                saveField="file"
                multiple={false}
                onBeforeUpload={e => onBeforeUpload(e)}
                onStatusChange={e => onStatusChange(e, 'documents_upload')}
                disabled={documentType === 0 || documentsOverflow}
                autoUpload={true}
                showFileList={false}
            />
        </div>
    )
};

export default memo(AdditionalDocumentUpload);