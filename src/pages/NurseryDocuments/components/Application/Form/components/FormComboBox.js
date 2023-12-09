import React, { useState, useEffect } from "react";
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';

import { IntlProvider, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import kendoMessages from "kendoMessages.json";

import './index.scss';

loadMessages(kendoMessages, 'ru');

export const FormComboBox = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, name, valid, disabled, wrapperStyle, data, value, onChange, resetValue, ...others } = fieldRenderProps;
    const [filteredData, setFilteredData] = useState(data);
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    useEffect(() => {
        data !== filteredData && setFilteredData(data);
    }, [data]);

    const onValueChange = React.useCallback(
        ({ target }) => {
            onChange(name, { value: target.value ? target.value.id : null })
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
                        data={filteredData}
                        onChange={onValueChange}
                        validationMessage={validationMessage}
                        filterable={true}
                        onFilterChange={handleFilterChange}
                        value={resetValue ? { id: null, name: null } : value}
                        popupSettings={{className: "combobox__item"}}
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