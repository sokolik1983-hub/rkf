import React, { useState } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const FormDropDownList = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, data, value, onChange, ...others } = fieldRenderProps;
    const [dropdownValue, setDropdownValue] = useState(data.filter(d => d.value === value)[0]);
    const editorRef = React.useRef(null);
    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    const onValueChange = React.useCallback(
        ({ target }) => {
            onChange({ value: target.value.value });
            setDropdownValue(target.value);
        },
        [onChange, value]
    );

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                id={labelId}
                editorRef={editorRef}
                editorId={id}
                editorValid={valid}
                editorDisabled={disabled}
            >
                {label}
            </Label>
            <DropDownList
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${errorId}`}
                ref={editorRef}
                textField="text"
                valid={valid}
                id={id}
                value={dropdownValue}
                data={data}
                onChange={onValueChange}
                disabled={disabled}
                dataItemKey="value"
                {...others}
            />
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormDropDownList);