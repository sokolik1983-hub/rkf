import React, { useState } from 'react';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { Upload } from '@progress/kendo-react-upload';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import ruMessages from '../ruMessages.json';
import Alert  from '../../../../../../../components/Alert'

import './styles.scss';

loadMessages(ruMessages, 'Application-ru');


const FormUpload = fieldRenderProps => {
    const { valid, value, id, optional, label, hint, validationMessage, touched, fileFormats, ...others } = fieldRenderProps;

    const [alert, setAlert] = useState(false)

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    const onChangeHandler = event => {
        event.newState[0].size < 10485760 ?
            fieldRenderProps.onChange({ value: event.newState }) :
            window.alert("Формат файла не поддерживается, либо размер файла превышает 10Мб. Поддерживаемые форматы PDF, JPG, JPEG.");
            // setAlert(true); //решено использовать стандартный Alert.
    };

    const onRemoveHandler = event => {
        fieldRenderProps.onChange({ value: event.newState });
    };

    return (
        <FieldWrapper className="kendo-form-upload">
            <Label id={labelId} editorId={id} editorValid={valid} optional={optional}>
                {label}
            </Label>
            <LocalizationProvider language="Application-ru">
                <IntlProvider locale="ru" >
                    <Upload
                        id={id}
                        valid={valid}
                        autoUpload={false}
                        showActionButtons={false}
                        multiple={false}
                        files={value}
                        onAdd={onChangeHandler}
                        onRemove={onRemoveHandler}
                        ariaDescribedBy={`${hintId} ${errorId}`}
                        ariaLabelledBy={labelId}
                        maxFileSize={10485760}
                        restrictions={{
                            allowedExtensions: fileFormats || []
                        }}
                        {...others}
                    />
                </IntlProvider>
            </LocalizationProvider>
            {showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
            {/*{alert &&*/}
            {/*    <Alert*/}
            {/*        title="Ошибка добавления документа"*/}
            {/*        text="Формат файла не поддерживается, либо размер файла превышает 10Мб. Поддерживаемые форматы PDF, JPG, JPEG."*/}
            {/*        autoclose={2}*/}
            {/*        onOk={() => setAlert(false)}*/}
            {/*    />*/}
            {/*}*/}
        </FieldWrapper>
    );
};

export default React.memo(FormUpload);