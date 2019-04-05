import React, {PureComponent} from 'react'
import DayPicker from 'react-day-picker';
import './index.scss'
const modifiers={
    green: [new Date(2019, 3, 5), new Date(2019, 3, 3)],
    blue: [new Date(2019, 3, 5), new Date(2019, 3, 3)],
}
export default class CalendarWidget extends PureComponent {
    onDayPickerClick = e => {
        console.log(e)
    };

    render() {
        return <DayPicker
            modifiers={modifiers}
            locale="ru"
            onDayClick={this.onDayPickerClick}
            firstDayOfWeek={1}
        />
    }
}