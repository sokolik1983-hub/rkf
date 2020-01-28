import React, { useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import Loading from "components/Loading";
import { MONTHS, WEEKDAYS_SHORT } from "appConfig";
import { formatDateToString } from "utils/datetime";
import { Request } from "utils/request";
import { endpointExhibitionsDates } from "pages/Exhibitions/config";
import { connectFilters } from "pages/Exhibitions/connectors";
import './index.scss';


const Calendar = ({ setFiltersSuccess, DateFrom }) => {
    const [day, setDay] = useState(new Date(DateFrom));
    const [years, setYears] = useState([]);
    const [modifier, setModifier] = useState({ selectedDate: day });
    const [activeButton, setActiveButton] = useState(null);
    const [loading, setLoading] = useState(true);

    const setNewDate = (date) => {
        setDay(date);
        setModifier({ ...modifier, selectedDate: date });
    };

    useEffect(() => {
        (() => Request({
            url: endpointExhibitionsDates
        }, data => {
            setYears(data.years);
            setModifier({ ...modifier, green: data.dates.map(day => new Date(day)) });
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    useEffect(() => {
        setNewDate(new Date(DateFrom));
    }, [DateFrom]);

    const handleFormChange = e => {
        const { year, month } = e.target.form;

        setActiveButton(null);

        setFiltersSuccess({
            ExhibitionName: '',
            DateFrom: formatDateToString(new Date(year.value, month.value, 1)),
            DateTo: formatDateToString(new Date(year.value, parseInt(month.value) + 1, 0)),
            PageNumber: 1
        });
    };

    const handleDateClick = date => {
        setActiveButton(null);

        setFiltersSuccess({
            ExhibitionName: '',
            DateFrom: formatDateToString(date),
            DateTo: formatDateToString(date),
            PageNumber: 1
        });
    };

    const handleButtonClick = period => {
        if(period === 'month') {
            setFiltersSuccess({
                ExhibitionName: '',
                DateFrom: formatDateToString(new Date(day.getFullYear(), day.getMonth(), 1)),
                DateTo: formatDateToString(new Date(day.getFullYear(), day.getMonth() + 1, 0)),
                PageNumber: 1
            });
        } else {
            setFiltersSuccess({
                ExhibitionName: '',
                DateFrom: formatDateToString(new Date(day.getFullYear(), 0, 1)),
                DateTo: formatDateToString(new Date(day.getFullYear() + 1, 0, 0)),
                PageNumber: 1
            });
        }

        setActiveButton(period);
    };

    return loading ?
        <Loading /> :
        <div className="exhibitions-calendar">
            <h4 className="exhibitions-calendar__title">Календарь выставок</h4>
            <div className="exhibitions-calendar__controls">
                <span
                    className={`exhibitions-calendar__button${activeButton === 'month' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('month')}
                >За месяц</span>
                <span
                    className={`exhibitions-calendar__button${activeButton === 'year' ? ' active' : ''}`}
                    onClick={() => handleButtonClick('year')}
                >За год</span>
            </div>
            <DayPicker
                showOutsideDays={true}
                months={MONTHS}
                month={day}
                weekdaysShort={WEEKDAYS_SHORT}
                modifiers={modifier}
                locale="ru"
                navbarElement={() => null}
                onDayClick={handleDateClick}
                onMonthChange={setNewDate}
                firstDayOfWeek={1}
                captionElement={({ date }) => (
                    <form className="DayPicker-Caption DayPickerForm">
                        <select name="month" onChange={handleFormChange} value={date.getMonth()}>
                            {MONTHS.map((month, i) => (
                                <option key={month} value={i}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select name="year" onChange={handleFormChange} value={date.getFullYear()}>
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </form>
                )}
            />
            <p className="exhibitions-calendar__legend">Доступные выставки</p>
        </div>
};

export default connectFilters(React.memo(Calendar));