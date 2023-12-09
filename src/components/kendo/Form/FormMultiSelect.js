import React, { useEffect, useState } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { MultiSelect } from '@progress/kendo-react-dropdowns';

const FormMultiSelect = fieldRenderProps => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, data, value, onChange, resetValue, selectType, className, ...others } = fieldRenderProps;
    const [dropdownValues, setDropdownValues] = useState(data.filter(selectType === 'rank' ? (d => d.value === value) : (d => d.id === value)));
    const editorRef = React.useRef(null);
    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    useEffect(() => {
        resetValue && setDropdownValues(resetValue);
    }, [resetValue])

    const onValueChange = React.useCallback(
        ({ target }) => {
            onChange({ value: target.value });
            setDropdownValues(target.value);
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
            <MultiSelect
                className={className}
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${errorId}`}
                ref={editorRef}
                textField={selectType === 'rank' ? 'text' : 'name'}
                valid={valid}
                id={id}
                value={dropdownValues}
                data={data}
                onChange={onValueChange}
                disabled={disabled}
                dataItemKey={selectType === 'rank' ? 'value' : 'id'}
                {...others}
            />
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormMultiSelect);