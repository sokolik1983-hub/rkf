import React from "react";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { IntlProvider, load, LocalizationProvider } from "@progress/kendo-react-intl";
// import { loadMessages } from "@progress/kendo-react-intl";
// import messages from "./translation/messages.json";
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

const min = new Date(2018, 12, 1);
// loadMessages(messages, 'ru');

const RangeCalendar = ({ value, onChange, container }) => {

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <DateRangePicker
                    value={value}
                    onChange={onChange}
                    format="dd.MM.yyyy"
                    calendarSettings={{
                        views: 2
                    }}
                    popupSettings={{
                        appendTo: container,
                        popupClass: "range-calendar__popup"
                    }}
                    className="range-calendar"
                    min={min}
                />
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default React.memo(RangeCalendar);