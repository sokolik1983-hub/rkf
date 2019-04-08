import React from 'react'
import './index.scss'

export const CalendarLegendItem = ({children, color}) =>
    <div
        className={`exhibitions-calendar__legend-item exhibitions-calendar__legend-item--${color}`}>
        {children}
    </div>;

const CalendarLegend = ({children}) =>
    <div className="exhibitions-calendar__legend">
        {children}
    </div>;


export default CalendarLegend;