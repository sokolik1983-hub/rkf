import React, {PureComponent} from 'react'
import DayPicker from 'react-day-picker';
import './index.scss'
const modifiers={
    green: [new Date(2019, 3, 5), new Date(2019, 3, 3)],
    blue: [new Date(2019, 3, 5), new Date(2019, 3, 3)],
};

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Аперль',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];


export default class CalendarWidget extends PureComponent {
    onDayPickerClick = e => {
        console.log(e)
    };

    render() {
        return <DayPicker
            showOutsideDays={true}
            months={MONTHS}
            weekdaysShort={WEEKDAYS_SHORT}
            modifiers={modifiers}
            locale="ru"
            onDayClick={this.onDayPickerClick}
            firstDayOfWeek={1}
        />
    }
}