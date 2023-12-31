import React, { useState, useEffect } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Request } from "../../../utils/request";
import { IntlProvider, load, LocalizationProvider, loadMessages } from "@progress/kendo-react-intl";
import { formatDateToString } from "../../../utils/datetime";
import { setFiltersToUrl } from "../../../pages/Search/utils";
import ruMessages from './ruMessages.json';
import "./index.scss";

loadMessages(ruMessages, 'ru');

load(
    require("cldr-data/supplemental/likelySubtags.json"),
    require("cldr-data/supplemental/weekData.json"),
    require("cldr-data/main/ru/numbers.json"),
    require("cldr-data/main/ru/currencies.json"),
    require("cldr-data/main/ru/ca-gregorian.json"),
    require("cldr-data/main/ru/dateFields.json"),
    require("cldr-data/main/ru/timeZoneNames.json")
);

const RangeCalendarSearch = ({ date_from, date_to, handleRangeClick }) => {
    const [maxYear, setMaxYear] = useState(null);
    const [loading, setLoading] = useState(true);
    const minYear = new Date(2018, 12, 1);
    const currentYear = new Date().getFullYear();

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
    }, []);

    const changeCalendarFilterFrom = e => {
        const values = e.target.value;

        setFiltersToUrl({
            date_from: formatDateToString(values)
        });
        handleRangeClick();
    };

    const changeCalendarFilterTo = e => {
        const values = e.target.value;

        setFiltersToUrl({
            date_to: values ? formatDateToString(values) : values
        });
        handleRangeClick();
    };

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <div className="calendar-filter__range-text _search_range">
                    <span>от</span>
                    <span>до</span>
                </div>
                <div className="calendar-filter__range-wrap">
                    <DatePicker
                        onChange={changeCalendarFilterFrom}
                        value={date_from ? new Date(date_from) : new Date()}
                        min={minYear}
                        max={loading ? new Date() : new Date(maxYear, 11, 31)}
                        format="dd.MM.yyyy"
                        className="calendar-filter__range-from"
                    />
                    <DatePicker
                        onChange={changeCalendarFilterTo}
                        value={date_to ? new Date(date_to) : null}
                        min={date_from ? new Date(date_from) : new Date()}
                        max={loading ? new Date() : new Date(maxYear, 11, 31)}
                        format="dd.MM.yyyy"
                        className="calendar-filter__range-to"
                        formatPlaceholder={{ year: `${currentYear}`, month: '12', day: '31' }}
                    />
                </div>
            </IntlProvider>
        </LocalizationProvider>
    );
}

export default React.memo(RangeCalendarSearch);