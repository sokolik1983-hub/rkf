import React from 'react'
import WidgetCalendar from './WidgetCalendar'
import CalendarLegend, {CalendarLegendItem} from 'apps/Exhibitions/components/Calendar/Legend'
import {connectExhibitionCalendar} from 'apps/Exhibitions/connectors'
import {endpointExhibitionsDates} from 'apps/Exhibitions/config'
import './index.scss'
import {useResourceAndStoreToRedux} from "shared/hooks";

function Calendar({calendarModifiers, fetchDatesSuccess}) {
     const { loading } = useResourceAndStoreToRedux(
        endpointExhibitionsDates,
        fetchDatesSuccess
    );
    return (
        <div className="exhibitions-calendar__holder">
            <div className="exhibitions-calendar__widget-switch">Календарь выставок</div>
            <div className="exhibitions-calendar">
                <WidgetCalendar modifiers={{green: calendarModifiers}}/>
            </div>
            <CalendarLegend>
                <CalendarLegendItem color="green">Моя выставка</CalendarLegendItem>
                {/*<CalendarLegendItem color="blue">Ваша выставка</CalendarLegendItem>*/}
            </CalendarLegend>
        </div>
    )
}

export default connectExhibitionCalendar(Calendar);