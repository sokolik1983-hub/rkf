import React from 'react'
import WidgetCalendar from 'components/WidgetCalendar'
import './index.scss'

const Calendar = () => <div className="exhibitions-calendar__holder">
    <h3>Календарь выставок</h3>
    <div className="exhibitions-calendar">
        <WidgetCalendar/>
    </div>
</div>;

export default Calendar;