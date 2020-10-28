import React from "react";
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { MaskedTextBox } from '@progress/kendo-react-inputs';


const FormMaskedInput = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, type, optional, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <MaskedTextBox
                    ariaDescribedBy={`${errorId}`}
                    valid={valid}
                    id={id}
                    {...others}
                />
                {
                    showValidationMessage &&
                    <Error id={errorId} direction={'end'}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};

export default React.memo(FormMaskedInput);