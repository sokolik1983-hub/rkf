import React, {useState} from 'react';
import { Field } from '@progress/kendo-react-form';
import FormUpload from '../FormUpload';
import { getHeaders } from 'utils/request';
import Alert from '../../../Alert';
import OutsideClickHandler from 'react-outside-click-handler';
import {blockContent} from '../../../../utils/blockContent';

const AdditionalDocumentUpload = ({ documents, documentsOverflow, formRenderProps, handleError, getDocuments }) => {
    const [isFormat, setIsFormat] = useState(true);
    const [isMaxSize, setIsMaxSize] = useState(false);

    const onBeforeUpload = (e) => {
        e.headers = getHeaders(true);
    };

    const onStatusChange = (event, name) => {
        if (event.response?.response) {
            const {extension, size} = event.newState[0];
            if(!(extension === '.pdf' || extension.toLowerCase() === '.jpg' || extension.toLowerCase() === '.jpeg')) {
                setIsFormat(false);
            }
            if(size > 10000000) {
                setIsMaxSize(true);
            }
            const { result } = event.response.response;
            if (result) {
                formRenderProps.onChange('documents', { value: [...documents, { name: result.name, document_id: result.id }] });
                formRenderProps.onChange(name, { value: [] });
                getDocuments();
            } else {
                handleError(event.response);
                formRenderProps.onChange(name, { value: [] });
            }
        }
    };

    const handleClose = () => {
        setIsFormat(true);
        setIsMaxSize(false);
        blockContent(false);
    }

    return (<div className="additional-document-upload">
        <Field
            id="documents_upload"
            name="documents_upload"
            fileFormats={['.pdf', '.jpg', '.jpeg', '.JPG']}
            component={FormUpload}
            saveUrl="/api/document/document/private"
            saveField="file"
            multiple={false}
            onBeforeUpload={e => onBeforeUpload(e)}
            onStatusChange={(e) => onStatusChange(e, 'documents_upload')}
            disabled={documentsOverflow}
            autoUpload={true}
            showFileList={false}
        />
        {(!isFormat || isMaxSize) &&
            <OutsideClickHandler onOutsideClick={handleClose}>
                <Alert
                    title="Произошла ошибка! =("
                    text={isMaxSize ? "Слишком большой размер файла! Максимум 10Mb" : "Неверный формат файла! Допустимы только файлы формата: '.pdf', '.jpg', '.jpeg'"}
                    okButton={true}
                    onOk={() => handleClose()}
                />
            </OutsideClickHandler>
        }
    </div>)
}

export default AdditionalDocumentUpload;