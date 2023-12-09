import React, { useState, useEffect } from "react";
import { Calendar, CalendarCell } from "@progress/kendo-react-dateinputs";
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

const ExhibitionsCalendar = ({ value, onChange }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 991);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 991);
        });

        return window.removeEventListener('resize', () => {
            setIsMobile(window.innerWidth < 991);
        });
    }, []);

    const style = isMobile ? { width: '25px' } : { width: '35px' };

    const customCell = (props) => {
        return (
            <CalendarCell {...props} style={style} />
        );
    };

    return (
        <LocalizationProvider language="ru">
            <IntlProvider locale="ru">
                <Calendar
                    value={value}
                    onChange={onChange}
                    format="dd.MM.yyyy"
                    className="exhibitions-calendar"
                    navigation={false}
                    cell={customCell}
                />
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default React.memo(ExhibitionsCalendar);