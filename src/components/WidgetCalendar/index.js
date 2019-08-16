import React, {useMemo} from 'react'
import DayPicker from 'react-day-picker';
import './index.scss'

const modifiers = {
    green: [new Date(2019, 3, 5), new Date(2019, 3, 3)],
    blue: [new Date(2019, 3, 5), new Date(2019, 3, 3)],
};

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


export default function CalendarWidget({modifiers = {}}) {
    const onDayPickerClick = e => {
        console.log(e)
    };


    return useMemo(() => <DayPicker
        showOutsideDays={true}
        months={MONTHS}
        weekdaysShort={WEEKDAYS_SHORT}
        modifiers={modifiers}
        locale="ru"
        onDayClick={onDayPickerClick}
        firstDayOfWeek={1}
    />, [modifiers])

}