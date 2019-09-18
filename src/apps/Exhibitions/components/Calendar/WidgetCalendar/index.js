import React, { useContext, useState } from 'react';
import DayPicker from 'react-day-picker';
import { formatDateToString } from 'utils/datetime';
import { WEEKDAYS_SHORT, MONTHS } from 'appConfig';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import YearMonthForm from './YaerMonthForm';
import './index.scss';

function CalendarWidget({ modifiers = {} }) {
    const [calendarModifiers, setCalendarModifiers] = useState({});
    const [month, setMonth] = useState(new Date());
    const { setDate, clearDate, handleCalendarMonthChange } = useContext(
        ExhibitionsFilterContext
    );

    const onDayPickerClick = e => {
        if (
            calendarModifiers.hasOwnProperty('selectedDate') &&
            formatDateToString(e) ===
                formatDateToString(calendarModifiers.selectedDate)
        ) {
            clearDate();
            setCalendarModifiers({});
        } else {
            setDate(formatDateToString(e));
            setCalendarModifiers({ ...calendarModifiers, selectedDate: e });
        }
    };

    const onMonthChange = e => {
        handleCalendarMonthChange(e);
    };
    const handleYearMonthChange = e => {
        setMonth(e)
    };
    return (
        <DayPicker
            showOutsideDays={true}
            months={MONTHS}
            month={month}
            weekdaysShort={WEEKDAYS_SHORT}
            modifiers={{ ...modifiers, ...calendarModifiers }}
            locale="ru"
            onDayClick={onDayPickerClick}
            onMonthChange={onMonthChange}
            firstDayOfWeek={1}
            captionElement={({ date, localeUtils }) => (
                <YearMonthForm
                    date={date}
                    localeUtils={localeUtils}
                    onChange={handleYearMonthChange}
                />
            )}
        />
    );
}
export default React.memo(CalendarWidget);
