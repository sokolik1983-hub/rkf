import React, {useEffect, useState} from "react";
import DayPicker from "react-day-picker";
import Select from 'react-select';
import Loading from "../../../../../../components/Loading";
import {MONTHS, WEEKDAYS_SHORT} from "../../../../../../appConfig";
import {formatDateToString} from "../../../../../../utils/datetime";
import {Request} from "../../../../../../utils/request";
import {endpointExhibitionsDates} from "../../../../config";
import {connectFilters} from "../../../../connectors";
import OutsideClickHandler from "react-outside-click-handler";
import "./index.scss";


const Calendar = ({ setFiltersSuccess, DateFrom }) => {
    const [day, setDay] = useState(new Date(DateFrom));
    const [years, setYears] = useState([]);
    const [modifier, setModifier] = useState({ selectedDate: day });
    const [activeButton, setActiveButton] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listIsOpenOfMonth, setListIsOpenOfMonth] = useState(false);
    const [listIsOpenOfYear, setListIsOpenOfYear] = useState(false);

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

    const handleFormChange = (data, date, period) => {
        const month = period === 'month' ? data.value : date.getMonth();
        const year = period === 'year' ? data.value : date.getFullYear();

        setActiveButton(null);

        setFiltersSuccess({
            ExhibitionName: '',
            DateFrom: formatDateToString(new Date(year, month, 1)),
            DateTo: formatDateToString(new Date(year, parseInt(month) + 1, 0)),
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
            setListIsOpenOfMonth();
        } else {
            setFiltersSuccess({
                ExhibitionName: '',
                DateFrom: formatDateToString(new Date(day.getFullYear(), 0, 1)),
                DateTo: formatDateToString(new Date(day.getFullYear() + 1, 0, 0)),
                PageNumber: 1
            });
            setListIsOpenOfYear();
        }

        setActiveButton(period);
    };

    const handleOutsideClick = () => {
        setListIsOpenOfMonth(false);
        setListIsOpenOfYear(false);
    };

    return loading ?
        <Loading /> :
        <div className="exhibitions-calendar">
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
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
                    captionElement={({ date }) => {
                        const monthsArr = MONTHS.map((month, i) => ({value: i, label: month}));
                        const yearsArr = years.map(year => ({value: year, label: year}));

                        return (
                            <form className="DayPickerForm" onChange={handleFormChange}>
                                <Select
                                    menuIsOpen={listIsOpenOfMonth}
                                    className="DayPickerForm__select"
                                    classNamePrefix="DayPickerForm__select"
                                    name="month"
                                    isClearable={false}
                                    value={monthsArr.filter(item => item.value === date.getMonth())[0]}
                                    options={monthsArr}
                                    onChange={data => handleFormChange(data, date, 'month')}
                                    onClick={setListIsOpenOfMonth()}
                                />
                                <Select
                                    menuIsOpen={listIsOpenOfYear}
                                    className="DayPickerForm__select"
                                    classNamePrefix="DayPickerForm__select"
                                    name="year"
                                    isClearable={false}
                                    value={yearsArr.filter(item => item.value === date.getFullYear())}
                                    options={yearsArr}
                                    onChange={data => handleFormChange(data, date, 'year')}
                                    onClick={setListIsOpenOfYear()}
                                />
                            </form>
                        )
                    }}
                />
                <div className="exhibitions-calendar__controls">
                    <button
                        className={`exhibitions-calendar__button${activeButton === 'year' ? ' active' : ''}`}
                        onClick={() => handleButtonClick('year')}
                    >Год</button>
                    <button
                        className={`exhibitions-calendar__button${activeButton === 'month' ? ' active' : ''}`}
                        onClick={() => handleButtonClick('month')}
                    >Месяц</button>
                </div>
                <p className="exhibitions-calendar__legend">Доступные выставки</p>
            </OutsideClickHandler>
        </div>
};

export default connectFilters(React.memo(Calendar));