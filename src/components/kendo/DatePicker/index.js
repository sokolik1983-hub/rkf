import React, { useEffect } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { IntlProvider, load, LocalizationProvider } from "@progress/kendo-react-intl";
import "./index.scss";

load(
    require("cldr-data/supplemental/likelySubtags.json"),
    require("cldr-data/supplemental/weekData.json"),
    require("cldr-data/main/ru/numbers.json"),
    require("cldr-data/main/ru/currencies.json"),
    require("cldr-data/main/ru/ca-gregorian.json"),
    require("cldr-data/main/ru/dateFields.json"),
    require("cldr-data/main/ru/timeZoneNames.json")
);

const UserDatePicker = ({ onChange, value, className }) => {

    useEffect(() => {
        document.querySelector(`.${className}`)
            .querySelector('input.k-input').readOnly = true;
    }, []);

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <DatePicker
                    onChange={onChange}
                    value={value}
                    format="dd.MM.yyyy"
                    className={className}
                />
            </IntlProvider>
        </LocalizationProvider>
    );
}

export default React.memo(UserDatePicker);