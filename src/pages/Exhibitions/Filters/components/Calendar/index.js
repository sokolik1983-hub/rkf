import React, { useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import Loading from "../../../../../components/Loading";
import { MONTHS, WEEKDAYS_SHORT } from "../../../../../appConfig";
import { formatDateToString } from "../../../../../utils/datetime";
import { getYears } from "../../../utils";
import { Request } from "../../../../../utils/request";
import { endpointExhibitionsDates } from "../../../config";
import { connectFilters } from "../../../connectors";
import './index.scss';


const Calendar = ({ setFiltersSuccess, DateFrom }) => {
    const [day, setDay] = useState(new Date(DateFrom));
    const [modifier, setModifier] = useState({ selectedDate: day });
    const [loading, setLoading] = useState(true);
    const years = getYears();

    const setNewDate = (date) => {
        setDay(date);
        setModifier({ ...modifier, selectedDate: date });
    };

    useEffect(() => {
        (() => Request({
            url: endpointExhibitionsDates
        }, data => {
            setModifier({ ...modifier, green: data.map(day => new Date(day)) });
            setLoading(false);
        },
            error => {
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
        setNewDate(new Date(year.value, month.value));
        setFiltersSuccess({
            ExhibitionName: '',
            DateFrom: formatDateToString(new Date(year.value, month.value, 1)),
            DateTo: formatDateToString(new Date(year.value, parseInt(month.value) + 1, 0)),
            PageNumber: 1
        })
    };

    return loading ?
        <Loading /> :
        <div className="exhibitions-calendar">
            <h4 className="exhibitions-calendar__title">Календарь выставок</h4>
            <DayPicker
                showOutsideDays={true}
                months={MONTHS}
                month={day}
                weekdaysShort={WEEKDAYS_SHORT}
                modifiers={modifier}
                locale="ru"
                navbarElement={() => null}
                onDayClick={date => {
                    setFiltersSuccess({ ExhibitionName: '', DateFrom: formatDateToString(date), DateTo: formatDateToString(date), PageNumber: 1 })
                    const searchCancel = document.getElementsByClassName('ExhibitionsSearch__cancel')[0]; // TODO: make this better
                    if (searchCancel) searchCancel.click();
                }}
                onMonthChange={date => setNewDate(date)}
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