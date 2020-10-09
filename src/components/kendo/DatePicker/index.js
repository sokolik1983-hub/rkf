import React, { useState, useEffect } from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { IntlProvider, load, LocalizationProvider } from "@progress/kendo-react-intl";
// import OutsideClickHandler from "react-outside-click-handler";
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

const UserDatePicker = ({onChange, value}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        document.querySelector('.UserEdit__date-picker')
            .querySelectorAll('input.k-input')
            .forEach(input => input.readOnly = true);
    }, []);

    useEffect(() => {
        const calendar = document.querySelector('.UserEdit__date-picker');

        const firstClick = () => {
            setShow(true);
            calendar.removeEventListener('click', firstClick);
            calendar.addEventListener('click', secondClick);
        };

        const secondClick = () => {
            setShow(false);
            calendar.addEventListener('click', firstClick);
        };

        calendar.addEventListener('click', firstClick);
        
        return () => {
            calendar.removeEventListener('click', firstClick);
            calendar.removeEventListener('click', secondClick);
        }
    }, []);


    // const handleClosePopup = () => {
    //     setShow(false);
    // };

    return (
            <LocalizationProvider language="ru">
                <IntlProvider locale="ru">
                    <DatePicker
                        onChange={onChange}
                        value={value}
                        format="dd.MM.yyyy"
                        className="UserEdit__date-picker"
                        // show={show}
                    />
                </IntlProvider>
            </LocalizationProvider>
    );
}

export default React.memo(UserDatePicker);