import React, {useState, useEffect} from "react";
import { DateRangePicker } from "@progress/kendo-react-dateinputs";
import { IntlProvider, load, LocalizationProvider } from "@progress/kendo-react-intl";
import { Request } from "../../../utils/request";
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

// loadMessages(messages, 'ru');

const RangeCalendar = ({ value, onChange, container }) => {
    const [loading, setLoading] = useState(true);
    const [maxYear, setMaxYear] = useState(null);
    const minYear = new Date(2018, 12, 1);

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/exhibition/dates`
        }, data => {
            const year = data.years.sort((a, b) => b - a);
            setMaxYear(year[0]);
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, []);

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <DateRangePicker
                    value={value}
                    onChange={onChange}
                    format="dd.MM.yyyy"
                    calendarSettings={{
                        views: 1
                    }}
                    popupSettings={{
                        appendTo: container,
                        popupClass: "range-calendar__popup"
                    }}
                    className="range-calendar"
                    min={minYear}
                    max={loading ? new Date() : new Date(maxYear, 12, 1)}
                />
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default React.memo(RangeCalendar);