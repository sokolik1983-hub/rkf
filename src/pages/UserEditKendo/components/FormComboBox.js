import React, { useState } from "react";
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { ComboBox } from '@progress/kendo-react-dropdowns';

export const FormComboBox = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, name, valid, disabled, wrapperStyle, data, value, onChange, ...others } = fieldRenderProps;

    const [dropdownValue, setDropdownValue] = useState(data.filter(d => d.id === value)[0]);
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    const onValueChange = React.useCallback(
        ({ target }) => {
            onChange(name, { value: target.value ? target.value.id : null })
            setDropdownValue(target.value);
        },
        [onChange, value]
    );

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
                {label}
            </Label>
            <ComboBox
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${errorId}`}
                ref={editorRef}
                valid={valid}
                id={id}
                disabled={disabled}
                value={dropdownValue}
                data={data}
                onChange={onValueChange}
                {...others}
            />
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormComboBox);