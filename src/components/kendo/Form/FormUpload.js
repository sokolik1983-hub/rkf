import React from "react";
import {FieldWrapper} from "@progress/kendo-react-form";
import {Label, Error, Hint} from "@progress/kendo-react-labels";
import {Upload} from "@progress/kendo-react-upload";
import {IntlProvider, LocalizationProvider, loadMessages} from "@progress/kendo-react-intl";
import kendoMessages from "../../../kendoMessages.json";
import "./index.scss";

loadMessages(kendoMessages, 'ru-RU');


const FormUpload = fieldRenderProps => {
    const { valid, value, id, optional, label, hint, validationMessage, touched, fileFormats, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    const onChangeHandler = event => {
        fieldRenderProps.onChange({ value: event.newState });
    };

    const onRemoveHandler = event => {
        fieldRenderProps.onChange({ value: event.newState });
    };

    return (
        <FieldWrapper className="kendo-form-upload">
            <Label id={labelId} editorId={id} editorValid={valid} optional={optional}>
                {label}
            </Label>
            <LocalizationProvider language="ru-RU">
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
        </FieldWrapper>
    );
};

export default React.memo(FormUpload);