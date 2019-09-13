import React, { useContext, useState } from 'react';
import DayPicker from 'react-day-picker';
import { WEEKDAYS_SHORT, MONTHS } from 'appConfig';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import { formatDateToString } from 'utils/datetime';
import './index.scss';

function CalendarWidget({ modifiers = {} }) {
    const [calendarModifiers, setCalendarModifiers] = useState({});
    const { setDate, clearDate } = useContext(ExhibitionsFilterContext);

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
        console.log(e);
    };
    return (
        <DayPicker
            showOutsideDays={true}
            months={MONTHS}
            weekdaysShort={WEEKDAYS_SHORT}
            modifiers={{ ...modifiers, ...calendarModifiers }}
            locale="ru"
            onDayClick={onDayPickerClick}
            onMonthChange={onMonthChange}
            firstDayOfWeek={1}
        />
    );
}
export default React.memo(CalendarWidget);
