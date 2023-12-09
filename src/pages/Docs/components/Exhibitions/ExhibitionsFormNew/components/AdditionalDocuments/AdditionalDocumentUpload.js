import React, { memo, useState } from "react";
import { Field } from "@progress/kendo-react-form";
import FormUpload from "../FormUpload";
import { getHeaders } from "../../../../../../../utils/request";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Alert from "../../../../../../../components/Alert";


const AdditionalDocumentUpload = ({ documents, docTypes, documentsOverflow, setDocumentsOverflow, setDisableSubmit, formRenderProps, handleError, dataType }) => {
    const [documentType, setDocumentType] = useState(dataType === 'international' ? 99 : 0);
    const [showAlert, setShowAlert] = useState(false);

    const onBeforeUpload = e => {
        e.headers = getHeaders(true);
        setDisableSubmit(true);
    };

    const onStatusChange = (event, name) => {
        if (event.response && event.response.response) {
            const { result } = event.response.response;
            if (result) {
                let newDocument = { name: result.name, document_id: result.id };

                if (documentType) newDocument.object_id = documentType;

                formRenderProps.onChange('documents', { value: [...documents, newDocument] });
                formRenderProps.onChange(name, { value: [] });
                setDisableSubmit(false);
            } else {
                handleError(event.response);
                formRenderProps.onChange(name, { value: [] });
            }
        }

        if (documents && documents.length + event.newState.length > 9) {
            setDocumentsOverflow(true);
        }
    };

    const onAdd = (event) => {
        const { newState } = event;
        if (newState && newState.find(item => item.size > 20971520)) {
            setShowAlert(true);
        }
    }

    return (
        <div className="AdditionalDocumentUpload">
            {docTypes &&
                <DropDownList
                    data={docTypes}
                    dataItemKey={dataType === 'ncpIds' ? 'id' : 'value'}
                    textField={dataType === 'ncpIds' ? 'name' : 'text'}
                    onChange={dataType === 'ncpIds' ? ({ value }) => setDocumentType(value.id) : ({ value }) => setDocumentType(value.value)}
                    defaultItem={dataType === 'ncpIds' ? { name: "Выберите тип", id: 0 } : dataType === 'international' ? { text: "Интернациональная", value: 99 } : { text: "Выберите тип", value: 0 }}
                    disabled={documentsOverflow || dataType === 'international'}
                />
            }
            <Field
                id="documents_upload"
                name="documents_upload"
                fileFormats={['.pdf', '.jpg', '.jpeg']}
                component={FormUpload}
                saveUrl="/api/requests/exhibition_request/clubexhibitionrequestdocument"
                saveField="file"
                multiple={false}
                restrictions={{
                    maxFileSize: 20000000,
                }}
                onAdd={e => onAdd(e)}
                onBeforeUpload={e => onBeforeUpload(e)}
                onStatusChange={e => onStatusChange(e, 'documents_upload')}
                disabled={(docTypes && documentType === 0) || documentsOverflow}
                autoUpload={true}
                showFileList={false}
            />
            {
                showAlert && <Alert
                    text="Размер загружаемого изображения не должен превышать 20Мб."
                    okButton={true}
                    onOk={() => setShowAlert(false)}
                />
            }

        </div>
    )
};

export default memo(AdditionalDocumentUpload);