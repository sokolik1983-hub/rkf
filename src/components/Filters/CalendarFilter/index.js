import React, { memo, useEffect, useRef, useState } from "react";
import {formatDateToString} from "../../../utils/datetime";
import "./index.scss";


const CalendarFilter = ({onChange, is_club_link, clear_filter, range_clicked, handleRangeReset}) => {
    const [activeButton, setActiveButton] = useState(is_club_link && !clear_filter ? 'year' : null);

    const day = new Date();


    const handleButtonClick = period => {
        if (period === 'day') {
            onChange({
                DateFrom: formatDateToString(new Date()),
                DateTo: formatDateToString(new Date())
            });
        } else if (period === 'month') {
            onChange({
                DateFrom: formatDateToString(new Date(day.getFullYear(), day.getMonth(), 1)),
                DateTo: formatDateToString(new Date(day.getFullYear(), day.getMonth() + 1, 0))
            });
        } else if (period === 'year') {
            onChange({
                DateFrom: formatDateToString(new Date(day.getFullYear(), 0, 1)),
                DateTo: formatDateToString(new Date(day.getFullYear() + 1, 0, 0))
            });
        }
        setActiveButton(period);
    };

    return (
        <div className="calendar-filter">
            <div className="calendar-filter__controls" onClick={handleRangeReset}>
                <button
                    className={`calendar-filter__button${activeButton === 'day' && !range_clicked ? ' active' : ''}`}
                    onClick={() => handleButtonClick('day')}
                >
                    Сегодня
                </button>
                <button
                    className={`calendar-filter__button${activeButton === 'month' && !range_clicked ? ' active' : ''}`}
                    onClick={() => handleButtonClick('month')}
                >
                    Месяц
                </button>
                <button
                    className={`calendar-filter__button${activeButton === 'year' && !range_clicked ? ' active' : ''}`}
                    onClick={() => handleButtonClick('year')}
                >
                    Год
                </button>
            </div>
        </div>
    )
};

export default memo(CalendarFilter);