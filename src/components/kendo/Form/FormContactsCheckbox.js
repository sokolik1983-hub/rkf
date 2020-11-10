import React from "react";
import { Error } from "@progress/kendo-react-labels";
import { Checkbox } from "@progress/kendo-react-inputs";
import { FieldWrapper } from "@progress/kendo-react-form";

const FormContactsCheckbox = (fieldRenderProps) => {
    const { validationMessage, touched, id, name, valid, disabled, label, visited, modified, formRenderProps, value, onChange, ...others } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Checkbox
                ariaDescribedBy={`${errorId}`}
                label={label}
                name={name}
                valid={valid}
                id={id}
                onChange={() => onChange(name)}
                disabled={disabled}
                checked={value}
                {...others}
            />
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormContactsCheckbox);