import React, { useState, useRef } from "react";
import { createPortal } from 'react-dom';
import DayPicker from 'react-day-picker';
import OutsideClickHandler from "react-outside-click-handler";
import YearMonthForm from './YearMonthForm';
import { WEEKDAYS_SHORT, MONTHS } from 'appConfig';
import './styles.scss';

const calendar = ({ props } = {}) => {
    const Calendar = ({ value, onValue }) => {
        const [date, setDate] = useState(value > new Date(null) ? value : new Date());

        const onDateChange = date => setDate(date);

        const handleDayClick = (day, { disabled }) => {
            if (disabled) return;
            onValue(day);
        };
        const ref = useRef(null);
        const wref = useRef(null);
        const widget = (
            <OutsideClickHandler onOutsideClick={() => onValue(date)}>
                <DayPicker
                    ref={wref}
                    locale="ru"
                    showOutsideDays={true}
                    months={MONTHS}
                    weekdaysShort={WEEKDAYS_SHORT}
                    firstDayOfWeek={1}
                    selectedDays={[date]}
                    month={date}
                    disabledDays={{ after: new Date() }}
                    onMonthChange={onDateChange}
                    onDayClick={handleDayClick}
                    captionElement={({ date, localeUtils }) => (
                        <YearMonthForm
                            date={date}
                            localeUtils={localeUtils}
                            onChange={onDateChange}
                        />
                    )}
                />
            </OutsideClickHandler>
        )
        React.useEffect(() => {
            const rect = ref.current && ref.current.getBoundingClientRect();
            if (rect && wref.current) {
                let el = wref.current.dayPicker;
                el.setAttribute('style', `display: block; top: ${rect.top}px; left: ${rect.left}px`);
            }
        })
        return (<div ref={ref} className="Calendar__dom-anchor">{createPortal(widget, document.querySelector('body'))}</div>)
    };

    return Calendar;
};

export default calendar;
