import React, { useEffect, useState } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import kendoMessages from "../../../kendoMessages.json";

loadMessages(kendoMessages, 'ru');

export const FormComboBox = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, name, valid, disabled, wrapperStyle, data, value, onChange, resetValue, ...others } = fieldRenderProps;
    const [filteredData, setFilteredData] = useState(data);
    const [dropdownValue, setDropdownValue] = useState(filteredData.filter(d => d.id === value)[0]);
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    useEffect(() => {
        resetValue && setDropdownValue(resetValue);
    }, [resetValue])

    const onValueChange = React.useCallback(
        ({ target }) => {
            onChange(name, { value: target.value ? target.value.id : null })
            setDropdownValue(target.value);
        },
        [onChange, value]
    );

    const filterData = (filter) => {
        data.slice();
        return filterBy(data, filter);
    }

    const handleFilterChange = (event) => {
        setFilteredData(filterData(event.filter));
    };

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
                {label}
            </Label>
            <LocalizationProvider language="ru">
                <IntlProvider locale="ru">
                    <ComboBox
                        ariaLabelledBy={labelId}
                        ariaDescribedBy={`${errorId}`}
                        ref={editorRef}
                        valid={valid}
                        id={id}
                        disabled={disabled}
                        value={dropdownValue}
                        data={filteredData}
                        onChange={onValueChange}
                        validationMessage={validationMessage}
                        filterable={true}
                        onFilterChange={handleFilterChange}
                        {...others}
                    />
                </IntlProvider>
            </LocalizationProvider>

            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export default React.memo(FormComboBox);