import React from 'react'
import DayPicker from 'react-day-picker';
import './index.scss'

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];


function CalendarWidget({modifiers = {}}) {
    const onDayPickerClick = e => {
        console.log(e)
    };

    return <DayPicker
        showOutsideDays={true}
        months={MONTHS}
        weekdaysShort={WEEKDAYS_SHORT}
        modifiers={modifiers}
        locale="ru"
        onDayClick={onDayPickerClick}
        firstDayOfWeek={1}
    />
}
export default React.memo(CalendarWidget)
