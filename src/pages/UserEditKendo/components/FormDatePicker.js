import React from "react";
import { FieldWrapper } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { IntlProvider, load, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import kendoMessages from "../../../kendoMessages.json";

loadMessages(kendoMessages, 'ru');

load(
    require("cldr-data/supplemental/likelySubtags.json"),
    require("cldr-data/supplemental/weekData.json"),
    require("cldr-data/main/ru/numbers.json"),
    require("cldr-data/main/ru/currencies.json"),
    require("cldr-data/main/ru/ca-gregorian.json"),
    require("cldr-data/main/ru/dateFields.json"),
    require("cldr-data/main/ru/timeZoneNames.json")
);


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
                <LocalizationProvider language="ru">
                    <IntlProvider locale="ru">
                        <DatePicker
                            ariaLabelledBy={labelId}
                            ariaDescribedBy={`${errorId}`}
                            valid={valid}
                            id={id}
                            disabled={disabled}
                            value={value ? new Date(value) : null}
                            className="FormDatePicker"
                            {...others}
                        />
                    </IntlProvider>
                </LocalizationProvider>
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};

export default React.memo(FormDatePicker);