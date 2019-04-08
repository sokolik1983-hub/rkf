import React from 'react'
import WidgetCalendar from 'components/WidgetCalendar'
import CalendarLegend, {CalendarLegendItem} from 'apps/Exhibitions/components/Calendar/Legend'

import './index.scss'

const Calendar = () => <div className="exhibitions-calendar__holder">
    <div className="exhibitions-calendar__widget-switch">Календарь выставок</div>
    <div className="exhibitions-calendar">
        <WidgetCalendar/>
    </div>
    <CalendarLegend>
        <CalendarLegendItem color="green">Вы участвуете</CalendarLegendItem>
        <CalendarLegendItem color="blue">Ваша выставка</CalendarLegendItem>
    </CalendarLegend>
</div>;

export default Calendar;