import React, { useState, useEffect } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Request } from "../../../utils/request";
import { IntlProvider, load, LocalizationProvider } from "@progress/kendo-react-intl";
import OutsideClickHandler from "react-outside-click-handler";
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
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
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

    useEffect(() => {
        const calendarFrom = document.querySelector('.calendar-filter__range-from');
        const calendarTo = document.querySelector('.calendar-filter__range-to');

        const firstClickFrom = () => {
            setShowFrom(true);
            setShowTo(false);
            calendarFrom.removeEventListener('click', firstClickFrom);
            calendarFrom.addEventListener('click', secondClickFrom);
        };

        const firstClickTo = () => {
            setShowTo(true);
            setShowFrom(false);
            calendarTo.removeEventListener('click', firstClickTo);
            calendarTo.addEventListener('click', secondClickTo);
        };

        const secondClickFrom = () => {
            setShowFrom(false);
            calendarFrom.addEventListener('click', firstClickFrom);
            calendarTo.addEventListener('click', firstClickTo);
        };

        const secondClickTo = () => {
            setShowTo(false);
            calendarTo.addEventListener('click', firstClickTo);
            calendarFrom.addEventListener('click', firstClickFrom);
        };

        calendarFrom.addEventListener('click', firstClickFrom);
        calendarTo.addEventListener('click', firstClickTo);
    }, []);

    const handleClosePopups = () => {
        setShowFrom(false);
        setShowTo(false);
    };

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <div className="calendar-filter__range-text">
                    <span>от</span>
                    <span>до</span>
                </div>
                <OutsideClickHandler onOutsideClick={handleClosePopups}>
                    <div className="calendar-filter__range-wrap">
                        <DatePicker
                            onChange={changeCalendarFilterFrom}
                            value={new Date(filters.DateFrom)}
                            min={minYear}
                            max={loading ? new Date() : new Date(maxYear, 11, 31)}
                            format="dd.MM.yyyy"
                            className="calendar-filter__range-from"
                            show={showFrom}
                        />
                        <DatePicker
                            onChange={changeCalendarFilterTo}
                            value={filters.DateTo ? new Date(filters.DateTo) : null}
                            min={new Date(filters.DateFrom)}
                            max={loading ? new Date() : new Date(maxYear, 11, 31)}
                            format="dd.MM.yyyy"
                            className="calendar-filter__range-to"
                            formatPlaceholder={{ year: `${currentYear}`, month: '12', day: '31' }}
                            show={showTo}
                        />
                    </div>
                </OutsideClickHandler>
            </IntlProvider>
        </LocalizationProvider>
    );
}

export default React.memo(RangeCalendar);