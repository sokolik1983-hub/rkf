import React from "react";
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const FormDatePicker = (fieldRenderProps) => {
    const {
        validationMessage, touched, label, id, valid,
        disabled, hint, wrapperStyle, hintDirection, value, ...others
    } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
                {label}
            </Label>
            <div className={'k-form-field-wrap'}>
                <DatePicker
                    ariaLabelledBy={labelId}
                    ariaDescribedBy={`${errorId}`}
                    valid={valid}
                    id={id}
                    disabled={disabled}
                    value={value ? new Date(value) : null}
                    {...others}
                />
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};

export default React.memo(FormDatePicker);