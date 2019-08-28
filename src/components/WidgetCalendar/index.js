import React, { useEffect } from 'react'
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

function CalendarWidget({ modifiers = {} }) {
    const onDayPickerClick = (e) => {
        console.log(e);
    };
    
    var daysOutside;
    useEffect(() => disableOutsideDayClick);
    const disableOutsideDayClick = () => {
        daysOutside = document.getElementsByClassName('DayPicker-Day--outside');
        for (let i = 0; i < daysOutside.length; i++) {
            daysOutside[i].addEventListener('click', (e) => e.cancelBubble = true);
        }
    }

    return <DayPicker
        showOutsideDays={true}
        months={MONTHS}
        weekdaysShort={WEEKDAYS_SHORT}
        modifiers={modifiers}
        locale="ru"
        onDayClick={onDayPickerClick}
        onMonthChange={disableOutsideDayClick}
        firstDayOfWeek={1}
    />
}
export default React.memo(CalendarWidget)
