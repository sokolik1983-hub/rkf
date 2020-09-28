import React, { useEffect, useState } from "react";
import { formatDateToString } from "../../../utils/datetime";
import ExhibitionsCalendar from "../../kendo/Calendar";
import { setFiltersToUrl } from "../../../pages/Exhibitions/utils.js";
import "./index.scss";


const CalendarFilter = ({ date_from, onChange }) => {
    const [day, setDay] = useState(new Date(date_from));
    const [activeButton, setActiveButton] = useState(null);

    const setNewDate = date => {
        setDay(date);
    };

    useEffect(() => {
        setNewDate(new Date(date_from));
    }, [date_from]);

    const handleButtonClick = period => {
        if (period === 'month') {
            onChange({
                DateFrom: formatDateToString(new Date(day.getFullYear(), day.getMonth(), 1)),
                DateTo: formatDateToString(new Date(day.getFullYear(), day.getMonth() + 1, 0))
            });
        } else {
            onChange({
                DateFrom: formatDateToString(new Date(day.getFullYear(), 0, 1)),
                DateTo: formatDateToString(new Date(day.getFullYear() + 1, 0, 0))
            });
        }
        setActiveButton(period);
    };

    const handleDayChoose = e => {
        const value = e.target.value;

        setFiltersToUrl({
            DateFrom: formatDateToString(value),
            DateTo: formatDateToString(value)
        });
    };

    return (
        <div className="calendar-filter">
            <ExhibitionsCalendar
                value={new Date(date_from)}
                onChange={handleDayChoose}
            />
            <div className="calendar-filter__controls">
                <button
                    className={`calendar-filter__button${activeButton === 'year' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('year')}
                >Год</button>
                <button
                    className={`calendar-filter__button${activeButton === 'month' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('month')}
                >Месяц</button>
            </div>
        </div>
    )
};

export default React.memo(CalendarFilter);