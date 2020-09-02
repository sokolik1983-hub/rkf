import React, {useEffect, useState, useRef} from "react";
import DayPicker from "react-day-picker";
import Select from "react-select";
import OutsideClickHandler from "react-outside-click-handler";
import {setFiltersToUrl} from "../../../../utils";
import {MONTHS, WEEKDAYS_SHORT} from "../../../../../../appConfig";
import {formatDateToString} from "../../../../../../utils/datetime";
import "./index.scss";
import "components/WidgetCalendar/index.scss";


const Calendar = ({dates, years, DateFrom}) => {
    const [day, setDay] = useState(new Date(DateFrom));
    const [modifier, setModifier] = useState({ selectedDate: day });
    const [activeButton, setActiveButton] = useState(null);

    const selectOfYear = useRef(null);
    const selectOfMonth = useRef(null);

    const setNewDate = date => {
        setDay(date);
        setModifier(modifier.green
            ? { ...modifier, selectedDate: date }
            : { ...modifier, green: dates.map(day => new Date(day)) }
        );
    };

    useEffect(() => {
        setNewDate(new Date(DateFrom));
    }, [DateFrom]);

    useEffect(() => {
        setModifier({...modifier, green: dates.map(day => new Date(day))});
    }, [dates]);

    const handleFormChange = (data, date, period) => {
        const month = period === 'month' ? data.value : date.getMonth();
        const year = period === 'year' ? data.value : date.getFullYear();

        setActiveButton(null);

        setFiltersToUrl({
            DateFrom: formatDateToString(new Date(year, month, 1)),
            DateTo: formatDateToString(new Date(year, parseInt(month) + 1, 0))
        });
    };

    const handleDateClick = date => {
        setActiveButton(null);

        setFiltersToUrl({
            DateFrom: formatDateToString(date),
            DateTo: formatDateToString(date),
        });
    };

    const handleButtonClick = period => {
        if (period === 'month') {
            setFiltersToUrl({
                DateFrom: formatDateToString(new Date(day.getFullYear(), day.getMonth(), 1)),
                DateTo: formatDateToString(new Date(day.getFullYear(), day.getMonth() + 1, 0)),
            });
        } else {
            setFiltersToUrl({
                DateFrom: formatDateToString(new Date(day.getFullYear(), 0, 1)),
                DateTo: formatDateToString(new Date(day.getFullYear() + 1, 0, 0)),
            });
        }
        setActiveButton(period);
    };

    const closeListOfYear = () => {
        selectOfYear.current.setState({menuIsOpen: false});
    };

    const closeListOfMonth = () => {
        selectOfMonth.current.setState({menuIsOpen: false});
    };

    return (
        <div className="exhibitions-calendar">
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
                    const monthsArr = MONTHS.map((month, i) => ({ value: i, label: month }));
                    const yearsArr = years.length ?
                        years.map(year => ({ value: year, label: year })) :
                        [{value: new Date().getFullYear(), label: new Date().getFullYear()}];

                    return (
                        <form className="DayPickerForm" onChange={handleFormChange}>
                            <OutsideClickHandler onOutsideClick={closeListOfMonth}>
                                <Select
                                    ref={selectOfMonth}
                                    className="DayPickerForm__select"
                                    classNamePrefix="DayPickerForm__select"
                                    name="month"
                                    isClearable={false}
                                    value={monthsArr.filter(item => item.value === date.getMonth())[0]}
                                    options={monthsArr}
                                    onChange={data => handleFormChange(data, date, 'month')}
                                />
                            </OutsideClickHandler>
                            <OutsideClickHandler onOutsideClick={closeListOfYear}>
                                <Select
                                    ref={selectOfYear}
                                    className="DayPickerForm__select"
                                    classNamePrefix="DayPickerForm__select"
                                    name="year"
                                    isClearable={false}
                                    value={yearsArr.filter(item => item.value === date.getFullYear())}
                                    options={yearsArr}
                                    onChange={data => handleFormChange(data, date, 'year')}
                                />
                            </OutsideClickHandler>
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
            <p className="exhibitions-calendar__legend">Доступные мероприятия</p>
        </div>
    )
};

export default React.memo(Calendar);