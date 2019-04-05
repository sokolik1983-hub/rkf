import React, {PureComponent} from 'react'
import DayPicker from 'react-day-picker';
import './index.scss'

export default class CalendarWidget extends PureComponent {
    onDayPickerClick = e => {
        console.log(e)
    };

    render() {
        return <DayPicker
            locale="ru"
            onDayClick={this.onDayPickerClick}
            firstDayOfWeek={1}
        />
    }
}