import React, { useState, useEffect } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Request } from "../../../utils/request";
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

const RangeCalendar = ({ filters, changeCalendarFilterFrom, changeCalendarFilterTo }) => {
    const [maxYear, setMaxYear] = useState(null);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        document.querySelector('.calendar-filter__range-wrap')
            .querySelectorAll('input.k-input')
            .forEach(input => input.readOnly = true);
    }, [])

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <h5 className="calendar-filter__range-title">Диапазон дат</h5>
                <div className="calendar-filter__range-text">
                    <span>от</span>
                    <span>до</span>
                </div>
                <div className="calendar-filter__range-wrap">
                    <DatePicker
                        onChange={changeCalendarFilterFrom}
                        value={new Date(filters.DateFrom)}
                        min={minYear}
                        max={loading ? new Date() : new Date(maxYear, 11, 31)}
                        format="dd.MM.yyyy"
                        className="calendar-filter__range-from"
                    />
                    <DatePicker
                        onChange={changeCalendarFilterTo}
                        value={filters.DateTo ? new Date(filters.DateTo) : null}
                        min={new Date(filters.DateFrom)}
                        max={loading ? new Date() : new Date(maxYear, 11, 31)}
                        format="dd.MM.yyyy"
                        className="calendar-filter__range-to"
                        formatPlaceholder={{ year: 'гггг', month: 'мм', day: 'дд' }}
                    />
                </div>
            </IntlProvider>
        </LocalizationProvider>);
}

export default React.memo(RangeCalendar);