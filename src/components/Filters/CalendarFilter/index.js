import React, { useEffect, useState } from "react";
import { formatDateToString } from "../../../utils/datetime";
import "./index.scss";


const CalendarFilter = ({ date_from, onChange, is_club_link, clear_filter }) => {
    const [day, setDay] = useState(new Date(date_from));
    const [activeButton, setActiveButton] = useState(is_club_link && !clear_filter ? 'year' : null);

    const setNewDate = date => {
        setDay(date);
    };

    const setInitialClubLinkFilter = () => {
        onChange({
            DateFrom: formatDateToString(new Date(day.getFullYear(), 0, 1)),
            DateTo: formatDateToString(new Date(day.getFullYear() + 1, 0, 0))
        });
    };

    useEffect(() => {
        activeButton === 'year' && !clear_filter ? setInitialClubLinkFilter() : setNewDate(new Date(date_from));
    }, [date_from]);

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
            <div className="calendar-filter__controls">
                <button
                    className={`calendar-filter__button${activeButton === 'day' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('day')}
                >
                    День
                </button>
                <button
                    className={`calendar-filter__button${activeButton === 'month' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('month')}
                >
                    Месяц
                </button>
                <button
                    className={`calendar-filter__button${activeButton === 'year' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('year')}
                >
                    Год
                </button>
            </div>
        </div>
    )
};

export default React.memo(CalendarFilter);