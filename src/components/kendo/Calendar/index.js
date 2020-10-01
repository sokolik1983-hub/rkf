import React from "react";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { IntlProvider, load, LocalizationProvider } from "@progress/kendo-react-intl";
import "./index.scss";
// import { loadMessages } from "@progress/kendo-react-intl";
// import messages from "./translation/messages.json";

load(
    require("cldr-data/supplemental/likelySubtags.json"),
    require("cldr-data/supplemental/weekData.json"),
    require("cldr-data/main/ru/numbers.json"),
    require("cldr-data/main/ru/currencies.json"),
    require("cldr-data/main/ru/ca-gregorian.json"),
    require("cldr-data/main/ru/dateFields.json"),
    require("cldr-data/main/ru/timeZoneNames.json")
);

// loadMessages(messages, 'ru');

const ExhibitionsCalendar = ({ value, onChange }) => {

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <Calendar
                    value={value}
                    onChange={onChange}
                    format="dd.MM.yyyy"
                    className="exhibitions-calendar"
                    navigation={false}
                />
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default React.memo(ExhibitionsCalendar);