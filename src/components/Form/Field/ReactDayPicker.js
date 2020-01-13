import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'components/WidgetCalendar/index.scss';
import { connect, getIn } from "formik";
const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

function ReactDayPicker({ name, formik, disabled }) {
    const value = getIn(formik.values, name);

    const onChange = date => {
        formik.setFieldValue(name, date)
    };

    return (
        <DayPickerInput
            value={value ? new Date(value) : new Date()}
            inputProps={{
                className: 'FormInput__input',
                name: 'date',
                disabled: !!disabled,
                style: {
                    width: '100%',
                }
            }}
            dayPickerProps={{
                showOutsideDays: true,
                months: MONTHS,
                weekdaysShort: WEEKDAYS_SHORT,
                locale: 'ru',
                firstDayOfWeek: 1
            }}
            onDayChange={onChange}
            onBlur={formik.handleBlur}
        />
    )
}

export default connect(ReactDayPicker);