import React from "react";
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';


const FormInput = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, type, optional, maxLength, passwordField, value, formRenderProps, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <Input
                    valid={valid}
                    type={type}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${errorId}`}
                    {...others}
                    onBlur={() => !value && formRenderProps.onFormReset()}
                />
                {
                    showValidationMessage ? <Error id={errorId}>{validationMessage}</Error> 
                    : 
                    maxLength ? <Hint ariaDescribedBy={`${errorId}`}>{passwordField ? `От 6 до 20 символов` : `Макс. кол-во символов: ${maxLength}`}</Hint> 
                    : ''
                }
            </div>
        </FieldWrapper>
    );
};

export default React.memo(FormInput);