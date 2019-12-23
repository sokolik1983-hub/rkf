import React, { useState } from "react";
import DayPicker from 'react-day-picker';
import OutsideClickHandler from "react-outside-click-handler";
import YearMonthForm from './YearMonthForm';
import { WEEKDAYS_SHORT, MONTHS } from 'appConfig';
import './styles.scss';

const calendar = ({ props } = {}) => {
    const Calendar = ({ value, onValue }) => {
        const [date, setDate] = useState(new Date());

        const onDateChange = date => setDate(date);

        const handleDayClick = (day, { disabled }) => {
            if (disabled) return;
            onValue(day);
        };

        return (
            <OutsideClickHandler onOutsideClick={() => onValue(date)}>
                <DayPicker
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
    };

    return Calendar;
};

export default calendar;