import React from 'react'
import WidgetCalendar from './WidgetCalendar'
import CalendarLegend, { CalendarLegendItem } from 'apps/Exhibitions/components/Calendar/Legend'
import { connectExhibitionCalendar } from 'apps/Exhibitions/connectors'
import { endpointExhibitionsDates } from 'apps/Exhibitions/config'
import './index.scss'
import { useResourceAndStoreToRedux } from "shared/hooks";
import AuthVisible from 'apps/Auth/containers/AuthVisible';

function Calendar({ calendarModifiers, fetchDatesSuccess }) {
    useResourceAndStoreToRedux(
        endpointExhibitionsDates,
        fetchDatesSuccess
    );
    console.log(AuthVisible);
    return (
        <div className="exhibitions-calendar__holder">
            <div className="exhibitions-calendar__widget-switch">Календарь выставок</div>
            <div className="exhibitions-calendar">
                <WidgetCalendar modifiers={{ green: calendarModifiers }} />
            </div>
            <CalendarLegend>
                <AuthVisible>
                    <CalendarLegendItem color="green">Моя выставка</CalendarLegendItem>
                    {/*<CalendarLegendItem color="blue">Ваша выставка</CalendarLegendItem>*/}
                </AuthVisible>
            </CalendarLegend>
        </div>
    )
}

export default connectExhibitionCalendar(Calendar);