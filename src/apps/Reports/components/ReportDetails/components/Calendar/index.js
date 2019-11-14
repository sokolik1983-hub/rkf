import React, {useState} from "react";
import DayPicker from 'react-day-picker';
import OutsideClickHandler from "react-outside-click-handler";
import YearMonthForm from './YearMonthForm';
import { WEEKDAYS_SHORT, MONTHS } from 'appConfig';
import './styles.scss';

const calendar = ({props} = {}) => {
    const Calendar = ({value, onValue}) => {
        const [date, setDate] = useState(value || new Date());

        const onDateChange = date => setDate(date);

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
                    onMonthChange={onDateChange}
                    onDayClick={onValue}
                    captionElement={({date, localeUtils}) => (
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