import React from 'react'
import WidgetCalendar from 'components/WidgetCalendar'
import CalendarLegend, {CalendarLegendItem} from 'apps/Exhibitions/components/Calendar/Legend'
import {connectExhibitionCalendar} from 'apps/Exhibitions/connectors'
import './index.scss'

function Calendar({calendarModifiers}) {
    return (
        <div className="exhibitions-calendar__holder">
            <div className="exhibitions-calendar__widget-switch">Календарь выставок</div>
            <div className="exhibitions-calendar">
                <WidgetCalendar modifiers={{green: calendarModifiers}}/>
            </div>
            <CalendarLegend>
                <CalendarLegendItem color="green">Есть события</CalendarLegendItem>
                {/*<CalendarLegendItem color="blue">Ваша выставка</CalendarLegendItem>*/}
            </CalendarLegend>
        </div>
    )
}

export default connectExhibitionCalendar(Calendar);